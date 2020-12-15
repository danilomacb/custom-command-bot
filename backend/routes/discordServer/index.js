const express = require("express");

const checkToken = require("../middleware/checkToken");
const add = require("./add");
const get = require("./get");
const remove = require("./remove");

const router = express.Router();

router.post("/add", add);
router.get("/:discordServerId/get", checkToken, get);
router.delete("/:discordServerId/remove", remove);

module.exports = router;
