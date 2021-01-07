export async function listOneDiscordUser(tokenType, token) {
  let res;
  try {
    res = await fetch("http://localhost:3001/discord-api/user/list-one", {
      method: "GET",
      headers: { authorization: `${tokenType} ${token}` },
    });
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");

    alert("Fail to login");
    console.error("Fail to list user\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");

    alert("Fail to login");
    console.error("Fail to covert response to json\n", err);
    return;
  }

  if (!res.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");

    alert(jsonRes.message);
    return;
  }

  return jsonRes.data.discordUser;
}
