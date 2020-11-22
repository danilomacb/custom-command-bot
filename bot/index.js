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
    await axios.post(process.env.BACKEND_LINK_DEV + "/discord-server/add", {
      name: guild.name,
      discordServerId: guild.id,
      discordOwnerId: guild.ownerID,
    });

    console.log("Discord server added");
    return;
  } catch (err) {
    console.error("Error on add discord server: ", err);
    return;
  }
});

client.on("guildDelete", async (guild) => {
  try {
    await axios.delete(process.env.BACKEND_LINK_DEV + "/discord-server/" + guild.id + "/remove");

    return console.log("Discord server deleted");
  } catch (err) {
    return console.error("Error on delete discord server: ", err);
  }
});

client.on("message", (message) => {
  if (message.content === prefix + "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
