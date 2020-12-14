const express = require("express");

const checkUser = require("../middleware/checkUser");
const add = require("./add");
const get = require("./get");
const getAll = require("./getAll");

const router = express.Router();

router.post("/:discordServerId/add", add);
router.get("/:discordServerId/get", checkUser, get);
router.get("/:discordServerId/get-all", checkUser, getAll);

module.exports = router;
