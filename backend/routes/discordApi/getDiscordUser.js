const getDiscordUserReq = require("../../util/getDiscordUserReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getDiscordUser(req, res) {
  try {
    const user = await getDiscordUserReq(req.headers.authorization);

    successHandler(res, 200, "Get discord user", { user: user.data });
    return;
  } catch (err) {
    errorHandler(res, 401, "Fail to get discord user", err);
    return;
  }
}

module.exports = getDiscordUser;
