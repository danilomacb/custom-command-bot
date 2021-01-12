const successHandler = require("../../handlers/successHandler");

async function listOne(req, res) {
  const { discordServer, memberLogged } = res.locals;
  const { discordServerName, discordServerId } = discordServer;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;

  successHandler(
    res,
    200,
    `Discord server listed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}`,
    "Discord server listed",
    { discordServer: { discordServerName, discordServerId, memberLogged } }
  );
}

module.exports = listOne;
