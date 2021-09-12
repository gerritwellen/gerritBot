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
        interaction.member.displayHexColor === "#000000"
          ? "#FFFFFF"
          : interaction.member.displayHexColor
      )
      .setFooter(`ID: ${interaction.member.id}`)
      .setTimestamp(new Date());
    return interaction.reply({ embeds: [uptimeEmbed] });
  },
};
