const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function update(req, res) {
  const { memberLogged, discordServer } = res.locals;
  const { textCommandId } = req.params;
  const { tag, message } = req.body;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId } = discordServer;

  discordServer.textCommands.map((textCommand) => {
    if (textCommand.id === textCommandId) {
      if (
        memberLogged.superAdm ||
        (memberLogged.adm && memberLogged.discordUserId === textCommand.discordUserId)
      ) {
        textCommand.tag = tag;
        textCommand.message = message;
      } else {
        errorHandler(
          res,
          401,
          `Permission denied, this user isn't a super admin or the admin who created this command on this discord server, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
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
      `Text command updated, tag: ${tag}, message: ${message}, textCommandId: ${textCommandId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Text command updated"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on update text command, save failed, tag: ${tag}, message: ${message}, textCommandId: ${textCommandId}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on update",
      err
    );
  }
}

module.exports = update;
