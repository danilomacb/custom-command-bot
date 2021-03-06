const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../handlers/successHandler");
const errorHandler = require("../../handlers/errorHandler");

async function add(req, res) {
  const { discordServerName, discordServerId, members } = req.body;

  const newDiscordServer = new DiscordServer({ discordServerName, discordServerId });

  newDiscordServer.members.push(...members);

  try {
    await newDiscordServer.save();
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on add discord server, save failed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}, members: ${JSON.stringify(
        members
      )}`,
      "Error on add discord server",
      err
    );
    return;
  }

  successHandler(
    res,
    201,
    `Discord server added, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}, members: ${JSON.stringify(
      members
    )}`,
    "Discord server added"
  );
}

module.exports = add;
