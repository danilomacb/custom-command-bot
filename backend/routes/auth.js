const express = require("express");
const axios = require("axios");

const errorHandler = require("./util/errorHandler");

const router = express.Router();

router.post("/", async (req, res) => {
  const { token, tokenType } = req.body;

  let user;
  try {
    user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    });
  } catch (err) {
    errorHandler(
      res,
      500,
      `Error on auth token: ${tokenType} ${token}, fail to get user data`,
      "Error on login",
      err
    );
    return;
  }

  res.status(200).json(user.data);
  return;
});

module.exports = router;
