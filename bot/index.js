require("dotenv").config();

const Discord = require("discord.js");
const axios = require("axios");

const checkValues = require("./util/checkValues");

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
  if (!checkValues(process.env.BACKEND_LINK_DEV, "environment variable BACKEND_LINK_DEV")) return;
  if (!checkValues(guild.id, "guild id")) return;
  if (!checkValues(guild.name, "guild name")) return;
  if (!checkValues(guild.ownerID, "guild owner id")) return;

  try {
    await axios.post(process.env.BACKEND_LINK_DEV + "/discord-server/add", {
      name: guild.name,
      discordServerId: guild.id,
      discordOwnerId: guild.ownerID,
    });

    console.log(`\n\tDiscord server with name: ${guild.name} and id: ${guild.id} added\n`);
    return;
  } catch (err) {
    console.error(
      `\n\tError on add discord server with name: ${guild.name} and id: ${guild.id} \n`
    );
    console.error(err);
    return;
  }
});

client.on("guildDelete", async (guild) => {
  if (!checkValues(process.env.BACKEND_LINK_DEV, "environment variable BACKEND_LINK_DEV")) return;
  if (!checkValues(guild.id, "guild id")) return;
  if (!checkValues(guild.name, "guild name")) return;

  try {
    await axios.delete(process.env.BACKEND_LINK_DEV + "/discord-server/" + guild.id + "/remove");

    console.log(`\n\tDiscord server with name: ${guild.name} and id: ${guild.id} deleted\n`);
    return;
  } catch (err) {
    console.error(
      `\n\tError on delete discord server with name: ${guild.name} and id: ${guild.id}\n`
    );
    console.error(err);
    return;
  }
});

client.on("message", (message) => {
  if (message.content === prefix + "ping") {
    if (!checkValues(message.content, "message content")) return;
    if (!checkValues(message.channel, "message channel")) return;

    message.channel.send("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
