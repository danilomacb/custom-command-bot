const listOneDiscordUserReq = require("../../util/listOneDiscordUserReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function listOneDiscordUser(req, res) {
  try {
    const discordUser = await listOneDiscordUserReq(req.headers.authorization);

    successHandler(
      res,
      200,
      `User logged in, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}`,
      "Successful login",
      { discordUser: discordUser.data }
    );
    return;
  } catch (err) {
    errorHandler(res, 401, "Error on login, request failed", "Error on login", err);
    return;
  }
}

module.exports = listOneDiscordUser;
