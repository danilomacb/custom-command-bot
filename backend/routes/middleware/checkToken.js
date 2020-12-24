const listOneDiscordUserReq = require("../../util/listOneDiscordUserReq");
const errorHandler = require("../../util/errorHandler");
const DiscordServer = require("../../models/DiscordServer");

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  const { discordServerId } = req.params;

  let discordUser;
  try {
    discordUser = await listOneDiscordUserReq(authorization);
  } catch (err) {
    errorHandler(
      res,
      401,
      `Error on check token, request failed, discordServerId: ${discordServerId}`,
      err
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
      err
    );
    return;
  }

  if (!discordServer) {
    errorHandler(
      res,
      404,
      `Error on check token, discord server not found, discordServerId: ${discordServerId}`
    );
    return;
  }

  const memberFound = discordServer.members.find(
    (member) => member.discordUserId === discordUser.data.id
  );

  res.locals.discordServer = discordServer;
  res.locals.member = memberFound;

  next();
}

module.exports = checkToken;
