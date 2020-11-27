require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./routes/auth");
const discordServer = require("./routes/discordServer");
const textCommands = require("./routes/textCommand");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/auth", auth);
    app.use("/discord-server", discordServer);
    app.use("/text", textCommands);

    app.listen(process.env.PORT, () => {
      console.log(`
       ___________________
      |                   |
      |  Backend running  |
      |___________________|

      `);
    });
  })
  .catch((err) => {
    console.error("\n\tError on connecting to a database");
    console.trace();
    console.error(err);
  });
