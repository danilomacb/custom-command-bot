const DiscordServer = require("../../models/DiscordServer");
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
      `Error on the delete discord server, fail to find discord server with id: ${req.params.discordServerId}`,
      "Error on the delete discord server",
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
      `Error on the delete discord server, fail to delete discord server with id: ${req.params.discordServerId}`,
      "Error on the delete discord server",
      err
    );
    return;
  }

  res.status(200).json({ message: "Discord server removed" });
  return;
}

module.exports = remove;
