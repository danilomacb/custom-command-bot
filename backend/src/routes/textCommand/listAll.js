const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function listAll(req, res) {
  const { discordServerId } = req.params;

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

  successHandler(
    res,
    200,
    `All text commands listed, discordServerId: ${discordServerId}`,
    "All text commands listed",
    { textCommands: discordServer.textCommands }
  );
}

module.exports = listAll;
