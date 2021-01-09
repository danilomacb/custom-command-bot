const successHandler = require("../../util/successHandler");

async function listAll(req, res) {
  const { discordServer, memberLogged } = res.locals;
  const { discordServerName, discordServerId, textCommands } = discordServer;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;

  successHandler(
    res,
    200,
    `All text commands listed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}`,
    "All text commands listed",
    { textCommands }
  );
}

module.exports = listAll;
