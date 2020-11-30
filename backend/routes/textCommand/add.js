const getDiscordUserReq = require("../discordApi/util/getDiscordUserReq");
const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function add(req, res) {
  const { authorization } = req.headers;
  const { tag, message } = req.body;
  const { discordServerId } = req.params;

  let user;
  try {
    user = await getDiscordUserReq(authorization);
  } catch (err) {
    errorHandler(res, 500, `Fail to get user data with token: ${authorization}`, err);
    return;
  }

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(res, 500, `Fail to add text command: ${tag}`, err);
    return;
  }

  const userFound = discordServer.superAdms.find((superAdm) => superAdm.discordUserId === user.data.id);
  if (!userFound) {
    errorHandler(
      res,
      401,
      `User with token: ${authorization} doesn't have permission to add text command in discord server with id: ${discordServerId}`
    );
    return;
  }

  discordServer.textCommands.push({ tag, message });

  try {
    await discordServer.save();

    successHandler(res, 200, `text command: ${tag} added`);
    return;
  } catch (err) {
    errorHandler(res, 500, `Fail to add text command: ${tag}`, err);
    return;
  }
}

module.exports = add;
