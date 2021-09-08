const { MessageEmbed } = require("discord.js");
const formatFromNow = require("../utils");

exports.run = (client, msg, args) => {
  let member;
  if (args == "") {
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
      member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor
    )
    .setFooter(`ID: ${member.id}`)
    .setTimestamp(new Date());
  msg.channel.send({ embeds: [userInfoEmbed] });
};
