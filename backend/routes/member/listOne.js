const successHandler = require("../../util/successHandler");

function listOne(req, res) {
  const { discordServer, member} = res.locals;

  successHandler(
    res,
    200,
    `Member listed, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}, discordServerId: ${discordServer.discordServerId}, discordServerName: ${discordServer.discordServerName}`,
    { member }
  );
}

module.exports = listOne;
