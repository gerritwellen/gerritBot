module.exports = (client, msg) => {
  // Ignore all bots
  if (msg.author.bot) return;
  //  Check for blocked/allowed channels
  if (
    client.config.blockedChannels.length == 0 &&
    msg.channelId == client.config.blockedChannels
  ) {
    return;
  }
  if (
    client.config.allowedChannels.length == 0 &&
    msg.channelId !== client.config.allowedChannels
  ) {
    return;
  }
  // Ignore messages not starting with the prefix (in config.json)
  if (msg.content.charAt(0) !== "!") return;

  let args = msg.content.split(" ");
  let command = args.shift().substring(1);

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, msg, args);
};
