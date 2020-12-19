const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function remove(req, res) {
  const { discordServerId, discordUserId } = req.params;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to find discord server, data: {discordServerId: ${discordServerId}, discordUserId: ${discordUserId}}`,
      err
    );
  }

  discordServer.members = discordServer.members.filter(
    (member) => member.discordUserId !== discordUserId
  );

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Member removed, data: {discordServerId: ${discordServerId}, discordServerName: ${discordServer.name}, discordUserId: ${discordUserId}}`
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to save database, data: {discordServerId: ${discordServerId}, discordServerName: ${discordServer.name}, discordUserId: ${discordUserId}}`,
      err
    );
  }
}

module.exports = remove;