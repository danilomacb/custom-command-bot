export async function listOneDiscordUser(tokenType, token) {
  let res;
  try {
    res = await fetch("http://localhost:3001/discord-api/user/list-one", {
      method: "GET",
      headers: { authorization: `${tokenType} ${token}` },
    });

    if (!res.ok) {
      alert("Fail to login");
      return;
    }
  } catch (err) {
    alert("Fail to login");
    console.error("Fail to list user\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.discordUser;
  } catch (err) {
    alert("Fail to login");
    console.error("Fail to covert response to json\n");
    return;
  }
}
