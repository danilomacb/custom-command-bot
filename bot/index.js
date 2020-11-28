require("dotenv").config();

const Discord = require("discord.js");
const axios = require("axios");

const errorHandler = require("./util/errorHandler");

const client = new Discord.Client();

const prefix = "$";

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

    console.log(res.data.message);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("guildDelete", async (guild) => {
  try {
    const res = await axios.delete(
      process.env.BACKEND_LINK_DEV + "/discord-server/" + guild.id + "/remove"
    );

    console.log(res.data.message);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("message", (message) => {
  if (message.content === prefix + "link") {
    return message.channel.send(
      `Use this link to manage the commands from this server:\n${process.env.FRONTEND_LINK_DEV}/discord-server/${message.guild.id}`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
