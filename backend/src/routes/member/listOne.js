const successHandler = require("../../util/successHandler");

function listOne(req, res) {
  const { discordServer, memberLogged } = res.locals;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId } = discordServer;

  successHandler(
    res,
    200,
    `Member listed, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId, ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
    "Member listed",
    { memberLogged }
  );
}

module.exports = listOne;
