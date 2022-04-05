const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('user-info')
            .setDescription('Display info abput yourself'),
    async execute(interaction) {
        await interaction.reply(`Your username: ${interaction.user.name}\nYour user id: ${interaction.use.id}`);
    },
};