const axios = require("axios");

const { prefix } = require("../config.json");

async function commands(message) {
  const res = await axios.get(`${process.env.BACKEND_LINK_DEV}/text/${message.guild.id}/list-all`);

  textCommandFound = res.data.data.textCommands.find(
    (textCommand) => `${prefix}${textCommand.tag}` === message.content
  );

  if (textCommandFound) {
    message.channel.send(textCommandFound.message);
  }
}

module.exports = commands;
