const axios = require("axios");

async function listAllDiscordGuildsReq(authorization) {
  const guilds = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization,
    },
  });

  return guilds;
}

module.exports = listAllDiscordGuildsReq;
