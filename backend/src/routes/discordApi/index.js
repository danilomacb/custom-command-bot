const express = require("express");

const listOneDiscordUser = require("./listOneDiscordUser");
const listAllDiscordGuilds = require("./listAllDiscordGuilds");

const router = express.Router();

router.get("/user/list-one", listOneDiscordUser);
router.get("/guild/list-all", listAllDiscordGuilds);

module.exports = router;
