const express = require("express");

const checkToken = require("../middleware/checkToken");
const add = require("./add");
const getAll = require("./getAll");

const router = express.Router();

router.post("/:discordServerId/add", checkToken, add);
router.get("/:discordServerId/get-all", checkToken, getAll);

module.exports = router;
