const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function remove(req, res) {
  const { discordServerId } = req.params;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({
      discordServerId: discordServerId,
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove discord server, find failed, discordServerId: ${discordServerId}`,
      "Error on remove discord server",
      err
    );
    return;
  }

  const { discordServerName } = discordServer;

  try {
    await discordServer.delete();
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove discord server, delete failed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on remove discord server",
      err
    );
    return;
  }

  successHandler(
    res,
    200,
    `Discord server removed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
    "Discord server removed"
  );
  return;
}

module.exports = remove;
