const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordServerId: { type: String, required: true },
  superAdms: [
    {
      discordUserId: { type: String, required: true },
    },
  ],
  textCommands: [
    {
      tag: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("discord-servers", DiscordServerSchema);
