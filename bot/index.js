require("dotenv").config();

const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();

const prefix = "$";

client.on("ready", () => {
  console.log("Bot running");
});

client.on("guildCreate", async (guild) => {
  try {
    await axios.post(process.env.BACKEND_LINK_DEV + "/discord-server/new", {
      name: guild.name,
      discordServerId: guild.id,
    });

    console.log("Discord server added");
    return;
  } catch (err) {
    console.error("Error on add discord server: ", err);
    return;
  }
});

client.on("message", (message) => {
  if (message.content === prefix + "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
