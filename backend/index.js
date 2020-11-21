require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./routes/auth");
const discordServer = require("./routes/discordServer");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/login", auth);
    app.use("/discord-server", discordServer);

    app.listen(process.env.PORT, () => {
      console.log("Server running on port: ", process.env.PORT);
    });
  })
  .catch((err) => console.error("Error on connect to database\n", err));
