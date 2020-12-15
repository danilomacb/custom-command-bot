const axios = require("axios");

async function getDiscordUserReq(authorization) {
  const discordUser = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization,
    },
  });

  return discordUser;
}

module.exports = getDiscordUserReq;
