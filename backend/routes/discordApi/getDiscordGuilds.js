const axios = require("axios");

const getDiscordGuildsReq = require("./util/getDiscordGuildsReq");
const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

async function getDiscordGuilds(req, res) {
  try {
    const guilds = await getDiscordGuildsReq(req.headers.authorization);

    successHandler(res, 200, "Get discord guilds", { guilds: guilds.data });
    return;
  } catch (err) {
    errorHandler(
      res,
      401,
      "Fail to get discord guilds",
      err
    );
    return;
  }
}

module.exports = getDiscordGuilds;
