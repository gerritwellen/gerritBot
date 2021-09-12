const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const formatFromNow = require("../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Gives information about user or server")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Info about a user")
        .addUserOption((option) =>
          option.setName("target").setDescription("The user")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Info about the server")
    ),
  async execute(interaction, client) {
    let infoEmbed = new MessageEmbed();
    let guild = interaction.guild;
    let owner = guild.members.cache.get(guild.ownerId);

    if (interaction.options.getSubcommand() === "user") {
      let user = interaction.options.getMember("target");
      if (!user) user = interaction.member;

      const createdAt = formatFromNow(user.user.createdTimestamp);
      const joinedAt = formatFromNow(user.joinedTimestamp);

      //Bot Check
      let bot = "This person is not a bot";
      if (user.user.bot.valueOf()) {
        bot = "Beep, Boop";
      }

      //Roles
      let roles = ["This user has no roles"];
      let filteredRoles = [];
      let size = 0;
      interaction.guild.members.cache
        .get(user.id)
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

      infoEmbed
        .setAuthor(user.user.tag, user.user.displayAvatarURL())
        .setThumbnail(user.user.displayAvatarURL())
        .setTitle(`Information about ${user.user.username}`)
        .addField("Username", user.user.username, true)
        //.addField(`Playing`, game, true)
        .addField("Account created", `${createdAt}`, true)
        .addField("Joined the server", `${joinedAt}`, true)
        .addField("Bot", bot)
        .addField(`Roles - ${size}`, `${roles}`)
        .setColor(
          user.displayHexColor === "#000000" ? "#FFFFFF" : user.displayHexColor
        )
        .setFooter(`ID: ${user.id}`)
        .setTimestamp(new Date());
    } else if (interaction.options.getSubcommand() === "server") {
      //Roles logic
      let roles = [];
      let rolesAmount = 0;
      guild.roles.cache.forEach((r) => roles.push(r));
      rolesAmount = roles.length;
      let channelAmount = [
        ...new Set(
          guild.channels.cache.filter((c) => c.type !== "GUILD_CATEGORY")
        ),
      ].length;
      let textChannelAmount = [
        ...new Set(guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")),
      ].length;
      let voiceChannelsAmount = [
        ...new Set(
          guild.channels.cache.filter((c) => c.type === "GUILD_VOICE")
        ),
      ].length;
      infoEmbed
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
    }
    return interaction.reply({ embeds: [infoEmbed] });
  },
};
