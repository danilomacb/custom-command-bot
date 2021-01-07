const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function update(req, res) {
  const { member, discordServer } = res.locals;
  const { textCommandId } = req.params;
  const { tag, message } = req.body;

  discordServer.textCommands.map((textCommand) => {
    if (textCommand.id === textCommandId) {
      if (member.superAdm || (member.adm && member.discordUserId === textCommand.discordUserId)) {
        textCommand.tag = tag;
        textCommand.message = message;
      } else {
        errorHandler(
          res,
          401,
          `Permission denied, this user isn't a super admin or the admin who created this command on this discord server, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
          "Permission denied"
        );
        return;
      }
    }
  });

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Text command updated, tag: ${tag}, message: ${message}, textCommandId: ${textCommandId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Text command updated"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on update text command, save failed, tag: ${tag}, message: ${message}, textCommandId: ${textCommandId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Error on update",
      err
    );
  }
}

module.exports = update;
