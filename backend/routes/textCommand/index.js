const express = require("express");

const checkToken = require("../middleware/checkToken");
const add = require("./add");
const getAll = require("./getAll");
const update = require("./update");

const router = express.Router();

router.post("/:discordServerId/add", checkToken, add);
router.get("/:discordServerId/get-all", checkToken, getAll);
router.put("/:discordServerId/update/:textCommandId", checkToken, update);

module.exports = router;
