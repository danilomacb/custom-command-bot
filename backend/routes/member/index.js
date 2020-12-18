const express = require("express");

const checkBot = require("../middleware/checkBot");
const checkToken = require("../middleware/checkToken");
const add = require("./add");
const get = require("./get");
const getAll = require("./getAll");
const remove = require("./remove");

const router = express.Router();

router.post("/:discordServerId/add", checkBot, add);
router.get("/:discordServerId/get", checkToken, get);
router.get("/:discordServerId/get-all", checkToken, getAll);
router.delete("/:discordServerId/remove/:discordUserId", checkBot, remove);

module.exports = router;
