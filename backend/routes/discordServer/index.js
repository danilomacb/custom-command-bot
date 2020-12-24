const express = require("express");

const checkBot = require("../middleware/checkBot");
const checkToken = require("../middleware/checkToken");
const add = require("./add");
const listOne = require("./listOne");
const remove = require("./remove");

const router = express.Router();

router.post("/add", checkBot, add);
router.get("/:discordServerId/list-one", checkToken, listOne);
router.delete("/:discordServerId/remove", checkBot, remove);

module.exports = router;
