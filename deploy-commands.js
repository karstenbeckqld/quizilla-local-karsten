const {REST} = require('@discordjs/rest');
const dotenv = require("dotenv");
const {Routes} = require('discord-api-types/v9');
const fs = require('node:fs');
dotenv.config();

const commands = [];
const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

// Place your client and guild ids here
// client and guild id are loaded with config.json

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);