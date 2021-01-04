const successHandler = require("../../util/successHandler");

function listOne(req, res) {
  const { discordServer, member} = res.locals;

  successHandler(
    res,
    200,
    `Member listed, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.name}`,
    { member }
  );
}

module.exports = listOne;
