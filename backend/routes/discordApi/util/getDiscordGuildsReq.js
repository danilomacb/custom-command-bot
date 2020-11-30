const axios = require("axios");

async function getDiscordGuildsReq(authorization) {
  try {
    const guilds = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: {
        authorization,
      },
    });

    return guilds;
  } catch (err) {
    return err;
  }
}

module.exports = getDiscordGuildsReq;
