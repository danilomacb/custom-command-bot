const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getAll(req, res) {
  const { discordServerId } = req.params;

  try {
    const discordServer = await DiscordServer.findOne({ discordServerId });

    successHandler(res, 200, `All members listed, data: {discordServer: ${discordServer}}`, {
      members: discordServer.members,
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to list all members, data: {discordServer: ${discordServer}}`,
      err
    );
  }
}

module.exports = getAll;
