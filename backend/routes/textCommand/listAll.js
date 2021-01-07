const successHandler = require("../../util/successHandler");

async function listAll(req, res) {
  const { discordServer, member } = res.locals;

  successHandler(
    res,
    200,
    `All text commands listed, discordServerName: ${discordServer.discordServerName}, discordServerId: ${discordServer.discordServerId}, memberUsername: ${member.discordUserUsername}, memberDiscriminator: ${member.discordUserDiscriminator}, memberId, ${member.discordUserId}`,
    "All text commands listed",
    {
      textCommands: discordServer.textCommands,
    }
  );
}

module.exports = listAll;
