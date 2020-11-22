const express = require("express");

const add = require("./add");
const remove = require("./remove");

const router = express.Router();

router.post("/add", add);
router.delete("/:discordServerId/remove", remove);

module.exports = router;
