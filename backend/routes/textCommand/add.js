const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { user, discordServer } = res.locals;
  const { tag, message } = req.body;

  if (!user.superAdm) {
    errorHandler(
      res,
      401,
      `This user doesn't have permission to add text command in this discord server, data: {username: ${user.discordUsername}, userId, ${user.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  discordServer.textCommands.push({ tag, message });

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Text command added, data: {tag: ${tag}, message: ${message}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to save text command, data: {tag: ${tag}, message: ${message}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`,
      err
    );
    return;
  }
}

module.exports = add;
