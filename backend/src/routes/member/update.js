const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function update(req, res) {
  const { memberLogged, discordServer } = res.locals;
  const { discordUserIdToUpdate } = req.params;
  const { role } = req.body;
  const { discordUserUsername, discordUserDiscriminator, discordUserId } = memberLogged;
  const { discordServerName, discordServerId } = discordServer;

  if (!memberLogged.superAdm) {
    errorHandler(
      res,
      401,
      `Permission denied, this user isn't an super admin of this discord server, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Permission denied"
    );
    return;
  }

  discordServer.members.map((member) => {
    if (member.discordUserId === discordUserIdToUpdate) {
      if (role === "superAdm") {
        if (!member.superAdm && !member.adm) {
          member.adm = true;
        }

        member.superAdm = !member.superAdm;
      }

      if (role === "adm") {
        if (member.adm && member.superAdm) {
          member.superAdm = false;
        }

        member.adm = !member.adm;
      }
    }
  });

  try {
    await discordServer.save();

    successHandler(
      res,
      200,
      `Member updated, discordUserIdToUpdate: ${discordUserIdToUpdate}, role: ${role}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Member updated"
    );
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on update member, save failed, discordUserIdToUpdate: ${discordUserIdToUpdate}, role: ${role}, discordUserUsername: ${discordUserUsername}, discordUserDiscriminator: ${discordUserDiscriminator}, discordUserId: ${discordUserId}, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on update member",
      err
    );
  }
}

module.exports = update;
