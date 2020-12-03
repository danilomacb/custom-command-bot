export async function getGuilds(tokenType, token) {
  let res;
  try {
    res = await fetch("http://localhost:3001/discord-api/get-guilds", {
      method: "GET",
      headers: { authorization: `${tokenType} ${token}` },
    });
  } catch (err) {
    console.error("Fail to get guilds\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.guilds;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}
