// Require necessary utility calsses
const fs = require("fs");

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require("discord.js");
const config = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.config = config;

// Register Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Attempting to load event ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

// Register Text Commands
client.commands = new Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load messagecommand ${commandName}`);
    client.commands.set(commandName, props);
  });
});

// Slash Command Event
client.slashCommands = new Collection();
const slashCommandFiles = fs
  .readdirSync("./slashCommands")
  .filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
  const slashCommand = require(`./slashCommands/${file}`);
  console.log(`Attempting to load slashcommand ${slashCommand.data.name}`);
  client.slashCommands.set(slashCommand.data.name, slashCommand);
}

// Login
client.login(client.config.token);
