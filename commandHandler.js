const fs = require('node:fs');
const {Client, Collection, Intents} = require('discord.js');

module.exports = () => {
    //Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS]
    });

    // Create a new commands Collection
    client.commands = new Collection();

    const commandFiles = fs
        .readdirSync('./commands')
        .filter(file => file.endsWith('.js'));

    console.log(commandFiles);

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        // Set a new item in the Collection with the key as the command and the value as the
        // exported module
        client.commands.set(command.data.name, command);

        console.log(file);
        console.log(commandFiles);
        console.log(command);
    }

    return client;
}