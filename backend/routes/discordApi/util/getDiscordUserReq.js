const axios = require("axios");

async function getDiscordUserReq(authorization) {
  try {
    const user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization,
      },
    });

    return user;
  } catch (err) {
    return err;
  }
}

module.exports = getDiscordUserReq;
