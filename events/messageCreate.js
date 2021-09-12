module.exports = (client, msg) => {
  // Ignore all bots
  if (msg.author.bot) return;

  //  Check for blocked/allowed channels
  let allowed = false;
  if (
    client.config.allowedChannels.length > 0 &&
    client.config.blockedChannels.length > 0
  ) {
    return console.log("You can't have both blocked and allowed Channels");
  }

  if (client.config.allowedChannels.length > 0) {
    client.config.allowedChannels.forEach((element) => {
      if (msg.channelId === element) {
        allowed = true;
      }
    });
  }
  if (client.config.blockedChannels.length > 0) {
    client.config.blockedChannels.forEach((element) => {
      if (msg.channelId !== element) {
        allowed = true;
      }
    });
  }

  if (!allowed) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (msg.content.charAt(0) !== client.config.prefix) return;

  let args = msg.content.split(" ");
  let command = args.shift().substring(1);

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, msg, args);
};
