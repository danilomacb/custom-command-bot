const express = require("express");

const getDiscordUser = require("./getDiscordUser");
const getDiscordGuilds = require("./getDiscordGuilds");

const router = express.Router();

router.get("/get-user", getDiscordUser);
router.get("/get-guilds", getDiscordGuilds);

module.exports = router;
