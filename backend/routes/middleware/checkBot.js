const axios = require("axios");

const errorHandler = require("../../util/errorHandler");

async function checkBot(req, res, next) {
  const { authorization } = req.headers;
  const { discordServerName, discordServerId, members } = req.body;

  let bot;
  try {
    bot = await axios.get("https://discord.com/api/oauth2/applications/@me", {
      headers: { authorization },
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on check bot, request failed, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}`,
      "Error on check bot",
      err
    );
  }

  if (bot.data.id !== process.env.BOT_ID) {
    errorHandler(
      res,
      500,
      `Permission denied, discordServerName: ${discordServerName}, discordServerId: ${discordServerId}}`,
      "Permission denied"
    );
  }

  next();
}

module.exports = checkBot;
