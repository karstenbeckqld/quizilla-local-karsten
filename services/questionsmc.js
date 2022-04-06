const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const questions = require("./data/questionsData.js");

function getRandomNumber(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

module.exports = function questionsMC() {

    // Declare variable to hold random number for questions
    let randomIndex = getRandomNumber(1, 3);

    let { question, answers } = questions.themes[0].history[randomIndex];

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("a")
                .setLabel("A")
                .setStyle("PRIMARY")
        )
        .addComponents(
            new MessageButton()
                .setCustomId("b")
                .setLabel("B")
                .setStyle("SECONDARY")
        )
        .addComponents(
            new MessageButton()
                .setCustomId("c")
                .setLabel("C")
                .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
                .setCustomId("d")
                .setLabel("D")
                .setStyle("DANGER")
        );

    const exampleEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${question}`).setDescription(`A: ${answers[0]}
    B: ${answers[1]}
    C: ${answers[2]}
    D: ${answers[3]}`);

    return {
        components: [row],
        embeds: [exampleEmbed],
    };
};