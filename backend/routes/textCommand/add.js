const getDiscordUserReq = require("../../util/getDiscordUserReq");
const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { authorization } = req.headers;
  const { tag, message } = req.body;
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

  const userFound = discordServer.superAdms.find(
    (superAdm) => superAdm.discordUserId === user.data.id
  );
  if (!userFound) {
    errorHandler(
      res,
      401,
      `The user doesn't have permission to add text command in this discord server, data: {username: ${user.data.username}, userId, ${user.data.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServerId}}`
    );
    return;
  }

  discordServer.textCommands.push({ tag, message });

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Text command added, data: {tag: ${tag}, message: ${message}, discordServerName: ${discordServer.name}, discordServerId: ${discordServerId}}`
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to save text command, data: {tag: ${tag}, message: ${message}, discordServerName: ${discordServer.name}, discordServerId: ${discordServerId}}`,
      err
    );
    return;
  }
}

module.exports = add;
