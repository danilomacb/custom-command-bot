const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function listAll(req, res) {
  const { discordServer, member, discordUser } = res.locals;

  if (!member.superAdm) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't a super admin of this discord server, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `All members listed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}`,
    {
      members: discordServer.members,
    }
  );
}

module.exports = listAll;
