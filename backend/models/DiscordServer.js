const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  discordServerName: { type: String, required: true },
  discordServerId: { type: String, required: true },
  members: [
    {
      discordUserId: { type: String, required: true },
      discordUserUsername: { type: String, required: true },
      discordUserDiscriminator: { type: String, required: true },
      discordUserAvatar: { type: String, required: false },
      adm: { type: Boolean, default: false },
      superAdm: { type: Boolean, default: false },
    },
  ],
  textCommands: [
    {
      tag: { type: String, required: true },
      message: { type: String, required: true },
      discordUserId: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("discord-servers", DiscordServerSchema);
