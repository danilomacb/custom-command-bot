const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordServerId: { type: String, required: true },
});

module.exports = mongoose.model("DiscordServer", DiscordServerSchema);
