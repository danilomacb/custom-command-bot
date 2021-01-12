const { listOneDiscordUserReq } = require("../../services/discordApiService");
const errorHandler = require("../../util/errorHandler");
const DiscordServer = require("../../models/DiscordServer");

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  const { discordServerId } = req.params;

  if (!authorization) {
    errorHandler(
      res,
      401,
      `Permission denied, user offline, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Permission denied"
    );
    return;
  }

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on check token, find failed, discordServerId: ${discordServerId}`,
      "Error on check token",
      err
    );
    return;
  }

  if (!discordServer) {
    errorHandler(
      res,
      404,
      `Error on check token, discord server not found, discordServerId: ${discordServerId}`,
      "Discord server not found"
    );
    return;
  }

  const discordUser = await listOneDiscordUserReq(authorization, res);

  const discordUserMember = discordServer.members.find(
    (member) => member.discordUserId === discordUser.data.id
  );

  if (!discordUserMember) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a member of this discord server, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Permission denied"
    );
    return;
  }

  res.locals.discordServer = discordServer;
  res.locals.memberLogged = discordUserMember;

  next();
}

module.exports = checkToken;
