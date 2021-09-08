const { MessageEmbed } = require("discord.js");

exports.run = (client, msg, args) => {
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
};
