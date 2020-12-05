const { response } = require("express");
const DiscordServer = require("../../models/DiscordServer");

async function getAll(req, res) {
  const { discordServerId } = req.params;

  const discordServer = await DiscordServer.findOne({ discordServerId });

  res.status(200).json({textCommands: discordServer.textCommands});
}

module.exports = getAll;
