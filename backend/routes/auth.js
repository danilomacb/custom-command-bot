const express = require("express");
const axios = require("axios");

const successHandler = require("./util/successHandler");
const errorHandler = require("./util/errorHandler");

const router = express.Router();

router.post("/", async (req, res) => {
  const { token, tokenType } = req.body;

  try {
    const user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    });

    successHandler(res, 200, `User with token: ${tokenType} ${token} logged in`, {
      user: user.data,
    });
    return;
  } catch (err) {
    errorHandler(res, 500, `Fail to get user data with token: ${tokenType} ${token}`, err);
    return;
  }
});

module.exports = router;
