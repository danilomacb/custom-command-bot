require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const discordApi = require("./routes/discordApi");
const discordServer = require("./routes/discordServer");
const textCommands = require("./routes/textCommand");
const getDate = require("./util/getDate");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/discord-api", discordApi);
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
    console.error(`\n\t[${getDate()}] Fail to connect to database`);
    console.trace();
    console.error(err);
  });
