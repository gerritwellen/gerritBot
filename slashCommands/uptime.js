const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const prettyMs = require("pretty-ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows Bot Uptime"),
  async execute(interaction, client) {
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
    return interaction.reply({ embeds: [uptimeEmbed] });
  },
};
