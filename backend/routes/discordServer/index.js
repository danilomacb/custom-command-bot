const express = require("express");

const post = require("./post");

const router = express.Router();

router.post("/new", post);

module.exports = router;
