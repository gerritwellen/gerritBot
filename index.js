// Require necessary utility calsses
//const fs = require("fs");
const formatFromNow = require("./utils");
// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Login to Discord with your client's token
client.login(token);

// Log meassage when connected
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  let tokens = msg.content.split(" ");
  let command = tokens.shift();
  if (command.charAt(0) === "!") {
    command = command.substring(1);
    if (command == "ping") {
      msg.react("🏓");
      let Pinging = new MessageEmbed().setTitle(`🏓 Pinging...`);
      msg.channel.send({ embeds: [Pinging] }).then((message) => {
        let pingEmbed = new MessageEmbed().setTitle(`🏓 Pong!`).addFields(
          {
            name: `**Ping:**`,
            value: `${Math.floor(message.createdAt - msg.createdAt)}ms`,
          },
          {
            name: `${client.user.username}'s Ping:`,
            value: `${Math.round(client.ws.ping)}ms`,
          },
          {
            name: `${msg.author.username}'s Ping:`,
            value: `${Math.abs(
              Math.floor(message.createdAt - msg.createdAt - client.ws.ping)
            )}ms`,
          }
        );
        message.edit({ embeds: [pingEmbed] });
      });
    } else if (command == "userinfo") {
      let member;
      if (tokens == "") {
        member = msg.guild.members.cache.get(msg.author.id);
      } else {
        msg.reply("Only useable on yourself.");
        return;
      }
      const game = "Not playing a game";

      //Account time data
      const createdAt = formatFromNow(member.user.createdTimestamp);
      const joinedAt = formatFromNow(member.joinedTimestamp);

      //Bot Check
      let bot = "This person is not a bot";
      if (member.user.bot.valueOf()) {
        bot = "Beep, Boop";
      }

      //Roles
      let roles = ["This user has no roles"];
      let filteredRoles = [];
      let size = 0;
      msg.guild.members.cache
        .get(member.id)
        .roles.cache.forEach((r) => roles.push(r));
      size = roles.length;
      if (size !== 1) {
        for (let r = 0; r < size - 1; r++) {
          if (roles[r] == "@everyone" || roles[r] == "This user has no roles") {
          } else {
            filteredRoles.push(roles[r]);
          }
        }
      }
      roles = filteredRoles;
      size = roles.length;

      let userInfoEmbed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Information about ${member.user.username}`)
        .addField("Username", member.user.username, true)
        //.addField(`Playing`, game, true)
        .addField("Account created", `${createdAt}`, true)
        .addField("Joined the server", `${joinedAt}`, true)
        .addField("Bot", bot)
        .addField(`Roles - ${size}`, `${roles}`)
        .setColor(
          member.displayHexColor === "#000000"
            ? "#FFFFFF"
            : member.displayHexColor
        )
        .setFooter(`ID: ${member.id}`)
        .setTimestamp(new Date());
      msg.channel.send({ embeds: [userInfoEmbed] });
    }
  }
});
