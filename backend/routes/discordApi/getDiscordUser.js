const getDiscordUserReq = require("./util/getDiscordUserReq");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function getDiscordUser(req, res) {
  try {
    const user = await getDiscordUserReq(req.headers.authorization);

    successHandler(res, 200, `Get user data with token: ${req.headers.authorization}`, {
      user: user.data,
    });
    return;
  } catch (err) {
    errorHandler(res, 500, `Fail to get user data with token: ${req.headers.authorization}`, err);
    return;
  }
}

module.exports = getDiscordUser;
