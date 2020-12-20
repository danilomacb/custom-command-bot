const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { discordServerId } = req.params;
  const { member } = req.body;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({ discordServerId });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add member, find failed,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId: ${member.discordUserId},
discordServerName: ${discordServer.name},
discordServerId: ${discordServerId}`,
      err
    );
  }

  discordServer.members.push(member);

  try {
    await discordServer.save();

    successHandler(
      res,
      201,
      `Member added,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId: ${member.discordUserId},
discordServerName: ${discordServer.name},
discordServerId: ${discordServerId}`
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add member, save failed,
memberUsername: ${member.discordUsername},
memberDiscriminator: ${member.discordDiscriminator},
memberId: ${member.discordUserId},
discordServerName: ${discordServer.name},
discordServerId: ${discordServerId}`,
      err
    );
  }
}

module.exports = add;
