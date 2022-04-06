const {SlashCommandBuilder} = require('@discordjs/builders');
const gameStartUp = require('../services/startup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Manage your trivia game')
        .addSubcommand((subcommand) => subcommand
            .setName('create')
            .setDescription('Create a trivia game.')
        )
        .addSubcommand((subcommand) => subcommand
            .setName('close')
            .setDescription('Close your trivia game.')
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand('create')) {
            await interaction.reply(
                `${interaction.user.username}, we are creating your trivia game!`,
            await gameStartUp(interaction)
        )
            ;
            //await interaction.followUp(await gameStartUp())
        } else if (interaction.options.getSubcommand('close')) {
            await interaction.reply(
                `${interaction.user.username}, we are closing your trivia game, hope you had a good time!`

                // Need a function that resets the game
            );
        }
    }
}
