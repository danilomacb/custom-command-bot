const express = require("express");

const checkUser = require("../middleware/checkUser");
const add = require("./add");
const getAll = require("./getAll");

const router = express.Router();

router.post("/:discordServerId/add", checkUser, add);
router.get("/:discordServerId/get-all", checkUser, getAll);

module.exports = router;
