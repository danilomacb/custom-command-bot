const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { parsedHash } = req.body;

  let user;
  try {
    user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${parsedHash.token_type} ${parsedHash.access_token}`,
      },
    });
  } catch (err) {
    console.error("Error on auth, fail to get user data\n", err);
    res.status(500).json({ message: "Error on login" });
  }

  res.status(200).json(user.data);
  return;
});

module.exports = router;
