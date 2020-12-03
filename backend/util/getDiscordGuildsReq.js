const axios = require("axios");

async function getDiscordGuildsReq(authorization) {
  const guilds = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization,
    },
  });

  return guilds;
}

module.exports = getDiscordGuildsReq;
