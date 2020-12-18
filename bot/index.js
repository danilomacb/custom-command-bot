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
  let members = [];

  guild.members.cache.map((member) => {
    if (!member.user.bot) {
      let discordUser = {
        discordUserId: member.user.id,
        discordUsername: member.user.username,
        discordDiscriminator: member.user.discriminator,
        discordAvatar: member.user.avatar,
      };

      if (member.user.id === guild.ownerID) {
        discordUser.adm = true;
        discordUser.superAdm = true;
      }

      members.push(discordUser);
    }
  });

  try {
    const res = await axios.post(`${process.env.BACKEND_LINK_DEV}/discord-server/add`, {
      name: guild.name,
      discordServerId: guild.id,
      members,
    });

    console.log(`\n\t${res.data.message}`);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("guildDelete", async (guild) => {
  try {
    const res = await axios.delete(
      `${process.env.BACKEND_LINK_DEV}/discord-server/${guild.id}/remove`
    );

    console.log(`\n\t${res.data.message}`);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;

  try {
    const res = await axios.post(`${process.env.BACKEND_LINK_DEV}/member/${member.guild.id}/add`, {
      member: {
        discordUserId: member.user.id,
        discordUsername: member.user.username,
        discordDiscriminator: member.user.discriminator,
        discordAvatar: member.user.avatar,
      },
    });

    console.log(`\n\t${res.data.message}`);
  } catch (err) {
    errorHandler(err);
  }
});

client.on("guildMemberRemove", async (member) => {
  if (member.user.bot) return;

  try {
    await axios.delete(
      `${process.env.BACKEND_LINK_DEV}/member/${member.guild.id}/remove/${member.user.id}`
    );
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
