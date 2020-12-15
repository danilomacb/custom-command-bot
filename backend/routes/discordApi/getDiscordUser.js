const getDiscordUserReq = require("../../util/getDiscordUserReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getDiscordUser(req, res) {
  try {
    const discordUser = await getDiscordUserReq(req.headers.authorization);

    successHandler(
      res,
      200,
      `Get discord user, data: {discordUserUsername: ${discordUser.data.username}, discordUserId: ${discordUser.data.id}}`,
      { discordUser: discordUser.data }
    );
    return;
  } catch (err) {
    errorHandler(res, 401, "Fail to get discord user", err);
    return;
  }
}

module.exports = getDiscordUser;
