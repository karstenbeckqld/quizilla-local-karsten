var questions = require('../services/data/questionsData.js');
const {MessageActionRow, MessageButton} = require("discord.js");

function getRandomNumber(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}


module.exports = async function mcquestions(interaction) {

    console.log('MCQuestions have started.');
    let chosenAnswer = '';
    let totalPoints = 0;

    // Declare variable to hold random number for questions
    let randomIndex = getRandomNumber(1, 3);

    // Create question object
    let {question, answers, correct, points} = questions.themes[0].history[randomIndex];

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(answers[0])
                .setEmoji('')
                .setLabel('A')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId(answers[1])
                .setEmoji('')
                .setLabel('B')
                .setStyle('DANGER')
        )
        .addComponents(
            new MessageButton()
                .setCustomId(answers[2])
                .setEmoji('')
                .setLabel('C')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId(answers[3])
                .setEmoji('')
                .setLabel('D')
                .setStyle('SECONDARY')
        )
    await interaction.reply({
        content: `${question}\n
             A: ${answers[0]}\n
             B: ${answers[1]}\n
             C: ${answers[2]}\n
             D: ${answers[3]}\n
             Choose your answer:\n`,
        components: [row],
    });

    const filter = (btnInt) => {
        return interaction.user.id === btnInt.user.id;
    };

    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 30,
    });

    collector.on('collect', (ButtonInteraction) => {
        ButtonInteraction.reply({
            content: `You've chosen ${ButtonInteraction.customId}`,
        })
    });

    collector.on('end', (collection) => {
        collection.forEach((click) => {
            let userID = click.user.id;
            chosenAnswer = click.customId;
            console.log(chosenAnswer, correct);
        })
    });

    console.log('Incorrect answer, no points awarded.');

}