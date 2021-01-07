import history from "../history";

export async function listOneDiscordServer(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/discord-server/${discordServerId}/list-one`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to list discord server\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }

  if (!res.ok) {
    alert(jsonRes.message);
    history.push("/");
    return;
  }

  return jsonRes.data.discordServer;
}
