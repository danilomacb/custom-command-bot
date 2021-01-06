const successHandler = require("../../util/successHandler");

async function listOne(req, res) {
  const { discordServer, member } = res.locals;

  successHandler(
    res,
    200,
    `One discord server listed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}`,
    {
      discordServer: {
        discordServerName: discordServer.discordServerName,
        discordServerId: discordServer.discordServerId,
        memberLogged: member,
      },
    }
  );
}

module.exports = listOne;
