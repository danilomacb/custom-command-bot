const listAllDiscordGuildsReq = require("../../util/listAllDiscordGuildsReq");
const successHandler = require("../../util/successHandler");
const errorHandler = require("../../util/errorHandler");

async function listAllDiscordGuilds(req, res) {
  try {
    const guilds = await listAllDiscordGuildsReq(req.headers.authorization);

    successHandler(res, 200, "All discord guilds listed", "All discord guilds listed", {
      guilds: guilds.data,
    });
    return;
  } catch (err) {
    errorHandler(
      res,
      401,
      "Error on list all discord guilds, request failed",
      "Error on list all discord guilds",
      err
    );
    return;
  }
}

module.exports = listAllDiscordGuilds;
