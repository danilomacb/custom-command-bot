const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function add(req, res) {
  const { tag, message } = req.body;

  let discordServer;
  try {
    discordServer = await DiscordServer.findOne({
      discordServerId: req.params.discordServerId,
    });
  } catch (err) {
    errorHandler(res, 500, `Fail to add text command: ${tag}`, err);
    return;
  }

  discordServer.textCommands.push({ tag, message });

  try {
    await discordServer.save();

    successHandler(res, 200, `text command: ${tag} added`);
    return;
  } catch (err) {
    errorHandler(res, 500, `Fail to add text command: ${tag}`, err);
    return;
  }
}

module.exports = add;
