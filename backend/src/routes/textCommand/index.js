const express = require("express");

const checkToken = require("../middleware/checkToken");
const add = require("./add");
const listAll = require("./listAll");
const update = require("./update");
const remove = require("./remove");

const router = express.Router();

router.post("/:discordServerId/add", checkToken, add);
router.get("/:discordServerId/list-all", listAll);
router.put("/:discordServerId/update/:textCommandIdToUpdate", checkToken, update);
router.delete("/:discordServerId/remove/:textCommandId", checkToken, remove);

module.exports = router;
