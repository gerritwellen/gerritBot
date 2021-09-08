const { MessageEmbed } = require("discord.js");

exports.run = (client, msg, args) => {
  const guild = msg.guild;
  const owner = guild.members.cache.get(guild.ownerId);

  //Roles logic
  let roles = [];
  let rolesAmount = 0;
  guild.roles.cache.forEach((r) => roles.push(r));
  rolesAmount = roles.length;
  let channelAmount = [
    ...new Set(guild.channels.cache.filter((c) => c.type !== "GUILD_CATEGORY")),
  ].length;
  let textChannelAmount = [
    ...new Set(guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")),
  ].length;
  let voiceChannelsAmount = [
    ...new Set(guild.channels.cache.filter((c) => c.type === "GUILD_VOICE")),
  ].length;
  //Embed
  const serverInfoEmbed = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setTitle(`Info about ${guild.name}`)
    .addField("Owner", owner.user.tag, true)
    .addField("Members", guild.memberCount.toString(), true)
    .addField("Partnered", guild.partnered ? "Yes" : "No", true)
    .addField("Channels", `${channelAmount}`, true)
    .addField("Text Channels", `${textChannelAmount}`, true)
    .addField("Voice Channels", `${voiceChannelsAmount}`, true)
    .addField(`Roles - ${rolesAmount}`, `${roles}`)
    .setFooter(`Server ID: ${guild.id} | Server Created`)
    .setTimestamp(guild.createdAt);

  msg.channel.send({ embeds: [serverInfoEmbed] });
};
