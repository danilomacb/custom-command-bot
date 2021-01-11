const express = require("express");

const checkBot = require("../middleware/checkBot");
const checkToken = require("../middleware/checkToken");
const add = require("./add");
const listAll = require("./listAll");
const update = require("./update");
const remove = require("./remove");

const router = express.Router();

router.post("/:discordServerId/add", checkBot, add);
router.get("/:discordServerId/list-all", checkToken, listAll);
router.put("/:discordServerId/update/:discordUserIdToUpdate", checkToken, update);
router.delete("/:discordServerId/remove/:discordUserId", checkBot, remove);

module.exports = router;
