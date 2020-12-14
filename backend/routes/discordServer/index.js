const express = require("express");

const checkUser = require("../middleware/checkUser");
const add = require("./add");
const get = require("./get");
const remove = require("./remove");

const router = express.Router();

router.post("/add", add);
router.get("/:discordServerId/get", checkUser, get);
router.delete("/:discordServerId/remove", remove);

module.exports = router;
