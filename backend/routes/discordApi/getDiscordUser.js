const getDiscordUserReq = require("../../util/getDiscordUserReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getDiscordUser(req, res) {
  try {
    const discordUser = await getDiscordUserReq(req.headers.authorization);

    successHandler(
      res,
      200,
      `User logged in, discordUserUsername: ${discordUser.data.username}, discordUserDiscriminator: ${discordUser.data.discriminator}, discordUserId: ${discordUser.data.id}`,
      { discordUser: discordUser.data }
    );
    return;
  } catch (err) {
    errorHandler(res, 401, "Error on login, request failed", err);
    return;
  }
}

module.exports = getDiscordUser;
