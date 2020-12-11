const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getAll(req, res) {
  const { discordServerId } = req.params;

  try {
    const discordServer = await DiscordServer.findOne({ discordServerId });

    successHandler(res, 200, `All text commands listed, data: {discordServer: ${discordServer}}`, {
      textCommands: discordServer.textCommands,
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to list all text commands, data: {discordServer: ${discordServer}}`,
      err
    );
  }
}

module.exports = getAll;
