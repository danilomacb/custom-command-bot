export async function getDiscordServer(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/discord-server/${discordServerId}/get`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to list discord server\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.discordServer;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}
