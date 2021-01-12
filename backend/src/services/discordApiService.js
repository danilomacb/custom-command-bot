const axios = require("axios");

const errorHandler = require("../handlers/errorHandler");

module.exports = {
  listOneDiscordUserReq: async (authorization, res) => {
    let discordUser;
    try {
      discordUser = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          authorization,
        },
      });
    } catch (err) {
      errorHandler(res, 500, "Error on login, request failed", "Error on login", err);
      return;
    }

    return discordUser;
  },
  listAllDiscordGuildsReq: async (authorization, res) => {
    let discordGuilds;
    try {
      discordGuilds = await axios.get("https://discord.com/api/users/@me/guilds", {
        headers: {
          authorization,
        },
      });
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

    return discordGuilds;
  },
};
