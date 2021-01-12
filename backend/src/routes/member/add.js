const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function add(req, res) {
  const { discordServerId } = req.params;
  const { member } = req.body;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = member;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add member, find failed, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerId: ${discordServerId}`,
      "Error on add member",
      err
    );
    return;
  }

  discordServer.members.push(member);

  const { discordServerName } = discordServer;

  try {
    await discordServer.save();
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add member, save failed, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on add member",
      err
    );
    return;
  }

  successHandler(
    res,
    201,
    `Member added, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
    "Member added"
  );
}

module.exports = add;
