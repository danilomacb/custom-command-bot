const DiscordServer = require("../../models/DiscordServer");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function add(req, res) {
  const { name, discordServerId, members } = req.body;

  const newDiscordServer = new DiscordServer({ name, discordServerId });

  newDiscordServer.members.push(...members)

  try {
    await newDiscordServer.save();

    successHandler(
      res,
      201,
      `New discord server registered on the database, data: {name: ${name}, discordServerId: ${discordServerId}}`
    );
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      `Fail to register a new discord server on the database, data: {name: ${name}, discordServerId: ${discordServerId}}`,
      err
    );
    return;
  }
}

module.exports = add;
