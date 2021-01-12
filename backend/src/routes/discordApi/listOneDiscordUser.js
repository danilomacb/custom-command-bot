const { listOneDiscordUserReq } = require("../../services/discordApiService");
const successHandler = require("../../handlers/successHandler");

async function listOneDiscordUser(req, res) {
  const discordUser = await listOneDiscordUserReq(req.headers.authorization, res);

  const { username, discriminator, id } = discordUser.data;

  successHandler(
    res,
    200,
    `User logged in, discordUserUsername: ${username}, discordUserDiscriminator: ${discriminator}, discordUserId: ${id}`,
    "Successful login",
    { discordUser: discordUser.data }
  );
}

module.exports = listOneDiscordUser;
