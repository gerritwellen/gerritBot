const { MessageEmbed } = require("discord.js");
const prettyMs = require("pretty-ms");

exports.run = (client, msg, args) => {
  let uptimeEmbed = new MessageEmbed()
    .setTitle(`Information about Bot Uptime`)
    .addField(
      `**${client.user.username}**'s Uptime`,
      `${prettyMs(client.uptime, {
        secondsDecimalDigits: 0,
      })}`,
      true
    )
    .setColor(
      msg.author.displayHexColor === "#000000"
        ? "#FFFFFF"
        : msg.author.displayHexColor
    )
    .setFooter(`ID: ${msg.author.id}`)
    .setTimestamp(new Date());
  msg.channel.send({ embeds: [uptimeEmbed] });
};
