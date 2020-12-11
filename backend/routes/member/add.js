const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { discordServerId } = req.params;
  const { member } = req.body;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to add new member, data: {discordServerId: ${discordServerId}, discordServerName: ${discordServer.name}, discordUserId: ${member.discordUserId}, discordUsername: ${member.discordUsername}, discordDiscriminator: ${member.discordDiscriminator}}`,
      err
    );
  }

  discordServer.members.push(member);

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `New member saved on database, data: {discordServerId: ${discordServerId}, discordServerName: ${discordServer.name}, discordUserId: ${member.discordUserId}, discordUsername: ${member.discordUsername}, discordDiscriminator: ${member.discordDiscriminator}}`
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to save new member on database, data: {discordServerId: ${discordServerId}, discordServerName: ${discordServer.name}, discordUserId: ${member.discordUserId}, discordUsername: ${member.discordUsername}, discordDiscriminator: ${member.discordDiscriminator}}`,
      err
    );
  }
}

module.exports = add;
