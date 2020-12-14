const errorHandler = require("../../util/errorHandler");
const successHandler = require("../../util/successHandler");

function get(req, res) {
  const { discordServer, user } = res.locals;

  if (!user) {
    errorHandler(
      res,
      401,
      `This user isn't a member in this discord server, data: {username: ${user.discordUsername}, userId, ${user.id}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `Member listed, data: {discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.name}, memberUsername: ${user.discordUsername}, memberId, ${user.id}}`,
    { member: { ...user } }
  );
}

module.exports = get;
