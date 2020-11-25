const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function remove(req, res) {
  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({
      discordServerId: req.params.discordServerId,
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to remove discord server with id: ${req.params.discordServerId}`,
      err
    );
    return;
  }

  try {
    await discordServer.delete();
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to remove discord server with id: ${req.params.discordServerId}`,
      err
    );
    return;
  }

  successHandler(res, 200, `Discord server with id: ${req.params.discordServerId} removed`);
  return;
}

module.exports = remove;
