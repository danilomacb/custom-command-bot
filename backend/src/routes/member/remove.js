const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function remove(req, res) {
  const { discordServerId, discordUserId } = req.params;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove member, find failed, discordServerId: ${discordServerId}, discordUserId: ${discordUserId}`,
      "Error on remove member",
      err
    );
    return;
  }

  discordServer.members = discordServer.members.filter(
    (member) => member.discordUserId !== discordUserId
  );

  const { discordServerName } = discordServer;

  try {
    await discordServer.save();
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove member, save failed, discordServerId: ${discordServerId}, discordServerName: ${discordServerName}, discordUserId: ${discordUserId}`,
      "Error on remove member",
      err
    );
    return;
  }

  successHandler(
    res,
    200,
    `Member removed, discordServerId: ${discordServerId}, discordServerName: ${discordServerName}, discordUserId: ${discordUserId}`,
    "Member removed"
  );
}

module.exports = remove;
