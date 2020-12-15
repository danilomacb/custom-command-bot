const errorHandler = require("../../util/errorHandler");
const successHandler = require("../../util/successHandler");

function get(req, res) {
  const { discordServer, member } = res.locals;

  if (!member) {
    errorHandler(
      res,
      401,
      `This user isn't a member in this discord server, data: {memberUsername: ${member.discordUsername}, memberId, ${member.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `Member listed, data: {discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.name}, memberUsername: ${member.discordUsername}, memberId, ${member.id}}`,
    { member }
  );
}

module.exports = get;
