const axios = require("axios");

const errorHandler = require("../../util/errorHandler");

async function checkBot(req, res, next) {
  const { authorization } = req.headers;
  const { name, discordServerId, members } = req.body;

  let bot;
  try {
    bot = await axios.get("https://discord.com/api/oauth2/applications/@me", {
      headers: { authorization },
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on check bot, request failed,
discordServerName: ${name},
discordServerId: ${discordServerId}`,
      err
    );
  }

  if (bot.data.id !== process.env.BOT_ID) {
    errorHandler(
      res,
      500,
      `Permission denied,
discordServerName: ${name},
discordServerId: ${discordServerId}}`
    );
  }

  next();
}

module.exports = checkBot;
