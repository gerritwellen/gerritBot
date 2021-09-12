module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  const slashCommand = client.slashCommands.get(interaction.commandName);
  if (!slashCommand) return;

  try {
    await slashCommand.execute(interaction, client);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
