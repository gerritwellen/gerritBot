const { MessageEmbed } = require("discord.js");
const prettyMs = require("pretty-ms");

exports.run = (client, msg, args) => {
  let uptimeEmbed = new MessageEmbed()
    .addField(
      `Uptime of **${client.user.username}**`,
      `${prettyMs(client.uptime, {
        secondsDecimalDigits: 0,
      })}`,
      true
    )
    .setColor(
      client.user.displayHexColor === "#000000"
        ? "#FFFFFF"
        : client.user.displayHexColor
    );
  msg.channel.send({ embeds: [uptimeEmbed] });
};
