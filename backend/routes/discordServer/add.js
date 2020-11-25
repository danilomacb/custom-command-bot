const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function post(req, res) {
  const { name, discordServerId, discordOwnerId } = req.body;

  const newDiscordServer = new DiscordServer({ name, discordServerId });

  newDiscordServer.superAdms.push({ id: discordOwnerId });

  try {
    await newDiscordServer.save();

    successHandler(
      res,
      200,
      `Discord server with name: ${name} and id: ${discordServerId} registered`
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to register discord server with name: ${name} and id: ${discordServerId}`,
      err
    );
    return;
  }
}

module.exports = post;
