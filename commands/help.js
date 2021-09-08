const { MessageEmbed } = require("discord.js");
const fs = require("fs");

exports.run = (client, msg, args) => {
  let author = msg.author;
  let commands = [];

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let commandName = file.split(".")[0];
      commands.push("`" + `${commandName}` + "`");
    });

    let helpEmbed = new MessageEmbed()
      .setTitle(`**Help**`)
      .setDescription(
        "See the commands you can use and get help on each command"
      )
      .addField("Available Commands", `${commands.join(" ")}`)

      .setColor(
        author.displayHexColor === "#000000"
          ? "#FFFFFF"
          : author.displayHexColor
      )
      .setFooter(`ID: ${author.id}`)
      .setTimestamp(new Date());
    msg.channel.send({ embeds: [helpEmbed] });
  });
};
