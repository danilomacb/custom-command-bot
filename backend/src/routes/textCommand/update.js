const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function update(req, res) {
  const { memberLogged, discordServer } = res.locals;
  const { textCommandIdToUpdate } = req.params;
  const { tag, message } = req.body;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId } = discordServer;

  if (!tag || !message) {
    errorHandler(
      res,
      400,
      `Error on update text command, empty field, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Empty field"
    );
    return;
  }

  if (tag.length > process.env.MAX_TAG_LENGTH) {
    errorHandler(
      res,
      400,
      `Error on update text command, tag too long, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Tag too long"
    );
    return;
  }

  if (message.length > process.env.MAX_MESSAGE_LENGTH) {
    errorHandler(
      res,
      400,
      `Error on update text command, message too long, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Message too long"
    );
    return;
  }

  const textCommandToUpdate = discordServer.textCommands.find(
    (textCommand) => textCommand.id === textCommandIdToUpdate
  );

  if (!textCommandToUpdate) {
    errorHandler(
      res,
      404,
      `Error on update text command, text command to update not found, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Text command to update not found"
    );
  }

  if (
    !memberLogged.superAdm &&
    !(memberLogged.adm && memberLogged.discordUserId === textCommandToUpdate.discordUserId)
  ) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a super admin or the admin who created this command on this discord server, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Permission denied"
    );
    return;
  }

  textCommandToUpdate.tag = tag;
  textCommandToUpdate.message = message;

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Text command updated, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Text command updated"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on update text command, save failed, tag: ${tag}, message: ${message}, textCommandIdToUpdate: ${textCommandIdToUpdate}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on update",
      err
    );
  }
}

module.exports = update;
