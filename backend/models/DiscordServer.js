const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordServerId: { type: String, required: true },
  members: [
    {
      discordUserId: { type: String, required: true },
      discordUsername: { type: String, required: true },
      discordDiscriminator: { type: String, required: true },
      discordAvatar: { type: String, required: false },
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
