const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function get(req, res) {
  const { discordServer, member } = res.locals;

  if (!member) {
    errorHandler(
      res,
      401,
      `This user isn't a member and can't see info about this discord server, data: {memberUsername: ${member.discordUsername}, memberId, ${member.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `Discord server listed, data: {discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.name}}`,
    {
      discordServer: { name: discordServer.name, discordServerId: discordServer.discordServerId },
    }
  );
}

module.exports = get;
