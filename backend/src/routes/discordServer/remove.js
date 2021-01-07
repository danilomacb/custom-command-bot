const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

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
      `Error on remove discord server, find failed, discordServerId: ${req.params.discordServerId}`,
      "Error on remove discord server",
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
      `Error on remove discord server, delete failed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${req.params.discordServerId}`,
      "Error on remove discord server",
      err
    );
    return;
  }

  successHandler(
    res,
    200,
    `Discord server removed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${req.params.discordServerId}`,
    "Discord server removed"
  );
  return;
}

module.exports = remove;
