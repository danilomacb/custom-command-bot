const express = require("express");

const add = require("./add");
const getAll = require("./getAll");

const router = express.Router();

router.post("/:discordServerId/add", add);
router.get("/:discordServerId/get-all", getAll);

module.exports = router;
