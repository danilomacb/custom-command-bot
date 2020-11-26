const express = require("express");

const add = require("./add");

const router = express.Router();

router.post("/:discordServerId/add", add);

module.exports = router;
