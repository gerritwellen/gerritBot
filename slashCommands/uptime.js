const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const prettyMs = require("pretty-ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows Bot Uptime"),
  async execute(interaction, client) {
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
    return interaction.reply({ embeds: [uptimeEmbed] });
  },
};
