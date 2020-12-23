const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { member, discordServer } = res.locals;
  const { discordUserId } = member;
  const { tag, message } = req.body;

  if (!member.superAdm && !member.adm) {
    errorHandler(
      res,
      401,
      `Permission denied, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  discordServer.textCommands.push({ tag, message, discordUserId });

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Text command added, tag: ${tag}, message: ${message}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}`
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add text command, save failed, tag: ${tag}, message: ${message}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}`,
      err
    );
    return;
  }
}

module.exports = add;
