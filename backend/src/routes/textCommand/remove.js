const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function remove(req, res) {
  const { member, discordServer } = res.locals;
  const { textCommandId } = req.params;

  let command, index;
  discordServer.textCommands.map((textCommand, textCommandIndex) => {
    if (textCommand.id === textCommandId) {
      command = textCommand;
      index = textCommandIndex;
      return;
    }
  });

  if (member.superAdm || (member.adm && member.discordUserId === command.discordUserId)) {
    discordServer.textCommands.splice(index, 1);
  } else {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a super admin or the admin who created this command on this discord server, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Permission denied"
    );
    return;
  }

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Text command removed, textCommandId: ${textCommandId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Text command removed"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove text command, save failed, textCommandId: ${textCommandId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Error on remove text command",
      err
    );
  }
}

module.exports = remove;
