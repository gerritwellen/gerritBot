const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Gives information about your ping"),
  async execute(interaction, client) {
    let interactionCreatedAt = interaction.createdAt;
    let Pinging = new MessageEmbed().setTitle(`🏓 Pinging...`);
    interaction.reply({ embeds: [Pinging] });
    interaction.fetchReply().then((reply) => {
      let replyCreatedAt = reply.createdAt;
      let pingEmbed = new MessageEmbed().setTitle(`🏓 Pong!`).addFields(
        {
          name: `**Ping:**`,
          value: `${Math.floor(reply.createdAt - interactionCreatedAt)}ms`,
        },
        {
          name: `${client.user.username}'s Ping:`,
          value: `${Math.round(client.ws.ping)}ms`,
        },
        {
          name: `${interaction.user.username}'s Ping:`,
          value: `${Math.abs(
            Math.floor(reply.createdAt - interactionCreatedAt - client.ws.ping)
          )}ms`,
        }
      );
      return interaction.editReply({ embeds: [pingEmbed] });
    });
  },
};
