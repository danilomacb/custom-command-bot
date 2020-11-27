const express = require("express");
const axios = require("axios");

const successHandler = require("../util/successHandler");
const errorHandler = require("../util/errorHandler");

const router = express.Router();

async function getDiscordUser(req, res) {
  try {
    const user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: req.headers.authorization,
      },
    });

    successHandler(res, 200, `Get user data with token: ${req.headers.authorization}`, {
      user: user.data,
    });
    return;
  } catch (err) {
    errorHandler(res, 500, `Fail to get user data with token: ${req.headers.authorization}`, err);
    return;
  }
}

module.exports = getDiscordUser;
