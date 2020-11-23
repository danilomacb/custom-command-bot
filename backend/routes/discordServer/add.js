const DiscordServer = require("../../models/DiscordServer");
const errorHandler = require("../util/errorHandler");
const checkBody = require("../util/checkBody");

async function post(req, res) {
  const { name, discordServerId, discordOwnerId } = req.body;

  if (!checkBody(res, name, "name")) return;
  if (!checkBody(res, discordServerId, "discordServerId")) return;
  if (!checkBody(res, discordOwnerId, "discordOwnerId")) return;

  const newDiscordServer = new DiscordServer({ name, discordServerId });

  newDiscordServer.superAdms.push({ id: discordOwnerId });

  try {
    await newDiscordServer.save();

    res.status(200).json({ message: "New Discord Server registered" });
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on create new discord server, fail to save the server: ${name}, with id: ${discordServerId} and owner id: ${discordOwnerId}`,
      "Error on create new discord server",
      err
    );
    return;
  }
}

module.exports = post;
