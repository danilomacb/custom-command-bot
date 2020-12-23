const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function get(req, res) {
  const { discordServer, member } = res.locals;

  if (!member) {
    errorHandler(
      res,
      401,
      `Permission denied, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `Discord server listed, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}`,
    {
      discordServer: {
        name: discordServer.name,
        discordServerId: discordServer.discordServerId,
        memberLogged: member,
      },
    }
  );
}

module.exports = get;
