const getDiscordGuildsReq = require("../../util/getDiscordGuildsReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function getDiscordGuilds(req, res) {
  try {
    const guilds = await getDiscordGuildsReq(req.headers.authorization);

    successHandler(res, 200, "Discord guilds listed", { guilds: guilds.data });
    return;
  } catch (err) {
    errorHandler(res, 401, "Error on list discord guilds, request failed", err);
    return;
  }
}

module.exports = getDiscordGuilds;
