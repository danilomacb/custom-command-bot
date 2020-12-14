const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getAll(req, res) {
  const { discordServer, user } = res.locals;

  if (!user) {
    errorHandler(
      res,
      401,
      `This user isn't a member and can't see the text commands from this server, data: {username: ${user.discordUsername}, userId, ${user.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(res, 200, `All text commands listed, data: {discordServerId: ${discordServer.discordServerId}}`, {
    textCommands: discordServer.textCommands,
  });
}

module.exports = getAll;
