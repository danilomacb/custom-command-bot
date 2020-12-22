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
      `Permission denied,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId, ${member.discordUserId},
discordServerName: ${discordServer.name},
discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Text command removed,
  textCommandId: ${textCommandId}
  memberUsername: ${member.discordUsername},
  memberDiscriminator: ${member.discordDiscriminator},
  memberId, ${member.discordUserId},
  discordServerName: ${discordServer.name},
  discordServerId: ${discordServer.discordServerId}`
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on remove text command, save failed
  textCommandId: ${textCommandId}
  memberUsername: ${member.discordUsername},
  memberDiscriminator: ${member.discordDiscriminator},
  memberId, ${member.discordUserId},
  discordServerName: ${discordServer.name},
  discordServerId: ${discordServer.discordServerId}`,
      err
    );
  }
}

module.exports = remove;
