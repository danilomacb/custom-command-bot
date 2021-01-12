const { listAllDiscordGuildsReq } = require("../../services/discordApiService");
const successHandler = require("../../handlers/successHandler");

async function listAllDiscordGuilds(req, res) {
  const guilds = await listAllDiscordGuildsReq(req.headers.authorization, res);

  successHandler(res, 200, "All discord guilds listed", "All discord guilds listed", {
    guilds: guilds.data,
  });
  return;
}

module.exports = listAllDiscordGuilds;
