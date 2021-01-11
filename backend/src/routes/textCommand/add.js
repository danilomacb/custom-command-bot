const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { memberLogged, discordServer } = res.locals;
  const { tag, message } = req.body;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId, textCommands } = discordServer;

  if (!memberLogged.superAdm && !memberLogged.adm) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't an admin or super admin of this discord server, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Permission denied"
    );
    return;
  }

  if (!tag || !message) {
    errorHandler(
      res,
      400,
      `Error on add text command, empty field, tag: ${tag}, message: ${message}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Empty field"
    );
    return;
  }

  if (tag.length > process.env.MAX_TAG_LENGTH) {
    errorHandler(
      res,
      400,
      `Error on add text command, tag too long, tag: ${tag}, message: ${message}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Tag too long"
    );
    return;
  }

  if (message.length > process.env.MAX_MESSAGE_LENGTH) {
    errorHandler(
      res,
      400,
      `Error on add text command, message too long, tag: ${tag}, message: ${message}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Message too long"
    );
    return;
  }

  registeredTag = textCommands.find((textCommand) => textCommand.tag === tag);
  if (registeredTag) {
    errorHandler(
      res,
      409,
      `This command already exists, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "This command already exists"
    );
    return;
  }

  discordServer.textCommands.push({ tag, message, discordUserId });

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Text command added, tag: ${tag}, message: ${message}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Text command added"
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add text command, save failed, tag: ${tag}, message: ${message}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on add text command",
      err
    );
    return;
  }
}

module.exports = add;
