const {MessageButton, MessageActionRow, MessageEmbed} = require('discord.js');
const mcquestions = require('../services/questionsmc.js');
const singlePlayer = 'single_player';
const multiPlayer = 'multi_player';

module.exports = async function startUp(interaction) {

    // declare variable that holds the user selection
    var selectedGame = '';

    // Create buttons for user to select type of game
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(singlePlayer)
                .setLabel('Single Player')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId(multiPlayer)
                .setLabel('Multi Player')
                .setStyle('PRIMARY')
        );

    // Create welcome message
    const startMessage = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Welcome Players')
        .setDescription('Quizilla is a trivia game bot. We can play in single user mode or multiple user mode. Please select an option below.\n' +
            '(Multi Player will allow for 1 minute for players to join the game.)');

    // Send message and buttons to user channel to display
    await interaction.channel.send({
        embeds: [startMessage],
        components: [row],
    });

    // Set up collector to collect answer to embed
    const collector = interaction.channel.createMessageComponentCollector({
        max: 1,
        time: 1000 * 30
    });

    // Collect customId from button as user selection
    collector.on('collect', (ButtonInteraction) => {
        selectedGame = ButtonInteraction.customId;
        ButtonInteraction.reply({
                content: `You've selected ${selectedGame}`,
            }
        )
    });

    collector.on('end', collected => {
        console.log(`Collected: ${collected.size} items\nCollected type: ${selectedGame}`);
    });

    if (selectedGame.toString().toLowerCase() === singlePlayer.toLowerCase()) {
        console.log('Single player selected.')
        await interaction.reply(
            mcquestions(interaction)
        );
    } else if (selectedGame.toString().toLowerCase() === multiPlayer.toLowerCase()) {
        console.log('Multi player selected.')
    }



}