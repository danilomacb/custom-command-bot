const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function remove(req, res) {
  const { memberLogged, discordServer } = res.locals;
  const { textCommandId } = req.params;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId } = discordServer;

  let command, index;
  discordServer.textCommands.map((textCommand, textCommandIndex) => {
    if (textCommand.id === textCommandId) {
      command = textCommand;
      index = textCommandIndex;
      return;
    }
  });

  if (
    memberLogged.superAdm ||
    (memberLogged.adm && memberLogged.discordUserId === command.discordUserId)
  ) {
    discordServer.textCommands.splice(index, 1);
  } else {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a super admin or the admin who created this command on this discord server, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Permission denied"
    );
    return;
  }

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Text command removed, textCommandId: ${textCommandId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId, ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Text command removed"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove text command, save failed, textCommandId: ${textCommandId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on remove text command",
      err
    );
  }
}

module.exports = remove;
