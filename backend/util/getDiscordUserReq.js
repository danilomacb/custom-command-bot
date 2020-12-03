const axios = require("axios");

async function getDiscordUserReq(authorization) {
  const user = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization,
    },
  });

  return user;
}

module.exports = getDiscordUserReq;
