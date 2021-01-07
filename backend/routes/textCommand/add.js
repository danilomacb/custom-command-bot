const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { member, discordServer, discordUser } = res.locals;
  const { discordUserId } = member;
  const { tag, message } = req.body;

  if (!member.superAdm && !member.adm) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't an admin or super admin of this discord server, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  registeredTag = discordServer.textCommands.find((textCommand) => textCommand.tag === tag);
  if (registeredTag) {
    errorHandler(
      res,
      409,
      `This command already exists, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  discordServer.textCommands.push({ tag, message, discordUserId });

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Text command added, tag: ${tag}, message: ${message}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      "Text command added"
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add text command, save failed, tag: ${tag}, message: ${message}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`,
      err
    );
    return;
  }
}

module.exports = add;
