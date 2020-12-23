const getDiscordUserReq = require("../../util/getDiscordUserReq");
const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getAll(req, res) {
  const { discordServer, member } = res.locals;

  if (!member.superAdm) {
    errorHandler(
      res,
      401,
      `Permission denied, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `All members listed, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}`,
    {
      members: discordServer.members,
    }
  );
}

module.exports = getAll;
