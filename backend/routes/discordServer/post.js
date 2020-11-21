const DiscordServer = require("../../models/DiscordServer");
const errorHandler = require("../util/errorHandler");

async function post(req, res) {
  const { name, discordServerId, discordUserId } = req.body;

  const newDiscordServer = new DiscordServer({ name, discordServerId });

  newDiscordServer.superAdms.push({ discordUserId });

  try {
    await newDiscordServer.save();

    res.status(201).json({ message: "New Discord Server registered" });
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      "Error on create new discord server, fail to save",
      "Error on create new discord server",
      err
    );
    return;
  }
}

module.exports = post;
