// Require the command handler that holds all command handling
// functionality (just outsourced code from index.js)
const Client = require('./commandHandler.js');
// Require config.json to load all tokens and ids
const { token } = require('./config.json');

// The functionality from the command handler file is assigned to the
// client constant to use it here.
const client = Client();

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log('Bot is ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }

});

// Login to Discord with the client's token
client.login(token);