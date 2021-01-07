const successHandler = require("../../util/successHandler");

async function listOne(req, res) {
  const { discordServer, member } = res.locals;

  successHandler(
    res,
    200,
    `Discord server listed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}`,
    "Discord server listed",
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
