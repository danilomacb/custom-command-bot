const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordServerId: { type: String, required: true },
  superAdms: [
    {
      _id: false,
      id: { type: String, required: true },
      username: { type: String, required: false, default: null },
      discriminator: { type: String, required: false, default: null },
    },
  ],
});

module.exports = mongoose.model("discord-servers", DiscordServerSchema);
