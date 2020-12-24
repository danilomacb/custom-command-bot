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

    if (res.status === 404) {
      alert("This discord server isn't registered");
      history.push("/");
      return;
    }

    if (res.status !== 200) {
      alert("Fail to load discord server");
      history.push("/");
      return;
    }
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
