const errorHandler = require("../../util/errorHandler");
const successHandler = require("../../util/successHandler");

function get(req, res) {
  const { discordServer, member } = res.locals;

  if (!member) {
    errorHandler(
      res,
      401,
      `Permission denied,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId: ${member.discordUserId},
discordServerName: ${discordServer.name},
discordServerId: ${discordServer.discordServerId}`
    );
    return;
  }

  successHandler(
    res,
    200,
    `Member listed,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId, ${member.discordUserId},
discordServerId: ${discordServer.discordServerId},
discordServerName: ${discordServer.name}`,
    { member }
  );
}

module.exports = get;
