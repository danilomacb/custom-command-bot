const express = require("express");

const checkBot = require("../middleware/checkBot");
const checkToken = require("../middleware/checkToken");
const add = require("./add");
const get = require("./get");
const remove = require("./remove");

const router = express.Router();

router.post("/add", checkBot, add);
router.get("/:discordServerId/get", checkToken, get);
router.delete("/:discordServerId/remove", checkBot, remove);

module.exports = router;
