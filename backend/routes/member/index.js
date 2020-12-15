const express = require("express");

const checkToken = require("../middleware/checkToken");
const add = require("./add");
const get = require("./get");
const getAll = require("./getAll");

const router = express.Router();

router.post("/:discordServerId/add", add);
router.get("/:discordServerId/get", checkToken, get);
router.get("/:discordServerId/get-all", checkToken, getAll);

module.exports = router;
