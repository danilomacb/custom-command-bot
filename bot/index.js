require("dotenv").config();

const Discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./config.json");
const errorHandler = require("./util/errorHandler");
const commands = require("./commands");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`
   _______________
  |               |
  |  Bot running  |
  |_______________|

  `);
});

client.on("guildCreate", async (guild) => {
  try {
    const res = await axios.post(process.env.BACKEND_LINK_DEV + "/discord-server/add", {
      name: guild.name,
      discordServerId: guild.id,
      discordOwnerId: guild.ownerID,
    });

    console.log(`\n\t${res.data.message}`);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("guildDelete", async (guild) => {
  try {
    const res = await axios.delete(
      process.env.BACKEND_LINK_DEV + "/discord-server/" + guild.id + "/remove"
    );

    console.log(`\n\t${res.data.message}`);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.charAt(0) !== prefix) return;

  if (message.content === prefix + "link") {
    return message.channel.send(
      `Use this link to manage the commands from this server:\n${process.env.FRONTEND_LINK_DEV}/discord-server/${message.guild.id}`
    );
  }

  commands(message);
});

client.login(process.env.DISCORD_TOKEN);
