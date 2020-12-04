const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function get(req, res) {
  const { discordServerId } = req.params;

  try {
    const discordServer = await DiscordServer.findOne({ discordServerId });

    successHandler(res, 200, `Discord server listed, data: {discordServerId: ${discordServerId}}`, {
      discordServer,
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to find discord server, data: {discordServerId: ${discordServerId}}`,
      err
    );
    return;
  }
}

module.exports = get;
