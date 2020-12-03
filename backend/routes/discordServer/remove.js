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
      `Fail to find discord server, data: {id: ${req.params.discordServerId}}`,
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
      `Fail to remove discord server, data: {name: ${discordServer.name}, id: ${req.params.discordServerId}}`,
      err
    );
    return;
  }

  successHandler(
    res,
    200,
    `Discord server removed, data: {name: ${discordServer.name}, id: ${req.params.discordServerId}}`
  );
  return;
}

module.exports = remove;
