const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function listAll(req, res) {
  const { discordServer, memberLogged } = res.locals;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId, members } = discordServer;

  if (!memberLogged.superAdm) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a super admin of this discord server, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Permission denied"
    );
    return;
  }

  successHandler(
    res,
    200,
    `All members listed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}`,
    "All members listed",
    { members }
  );
}

module.exports = listAll;
