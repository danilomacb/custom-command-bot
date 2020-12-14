const getDiscordUserReq = require("../../util/getDiscordUserReq");
const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getAll(req, res) {
  const { discordServer, user } = res.locals;

  if (!user.superAdm) {
    errorHandler(
      res,
      401,
      `This user doesn't have permission to see members in this discord server, data: {username: ${user.discordUsername}, userId, ${user.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `All members listed, data: {discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.name}}`,
    {
      members: discordServer.members,
    }
  );
}

module.exports = getAll;
