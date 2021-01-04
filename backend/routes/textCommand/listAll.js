const successHandler = require("../../util/successHandler");

async function listAll(req, res) {
  const { discordServer, member } = res.locals;

  successHandler(
    res,
    200,
    `All text commands listed, discordServerName: ${discordServer.name}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUsername}, memberDiscriminator: ${member.discordDiscriminator}, memberId, ${member.discordUserId}`,
    {
      textCommands: discordServer.textCommands,
    }
  );
}

module.exports = listAll;
