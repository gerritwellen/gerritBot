module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity({ name: "with code", type: "PLAYING" });
};
