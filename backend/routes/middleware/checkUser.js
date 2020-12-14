const getDiscordUserReq = require("../../util/getDiscordUserReq");
const errorHandler = require("../../util/errorHandler");
const DiscordServer = require("../../models/DiscordServer");

async function checkUser(req, res, next) {
  const { authorization } = req.headers;
  const { discordServerId } = req.params;

  let user;
  try {
    user = await getDiscordUserReq(authorization);
  } catch (err) {
    errorHandler(res, 401, "Fail to get user data", err);
    return;
  }

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to find discord server, data: {discordServerId: ${discordServerId}}`,
      err
    );
    return;
  }

  if (!discordServer) {
    errorHandler(res, 404, `Discord server not found, data: {discordServerId: ${discordServerId}}`);
    return;
  }

  const userFound = discordServer.members.find((member) => member.discordUserId === user.data.id);

  res.locals.discordServer = discordServer;
  res.locals.user = userFound;

  next();
}

module.exports = checkUser;
