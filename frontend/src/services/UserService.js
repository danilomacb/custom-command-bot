export async function getUser(tokenType, token) {
  let res;
  try {
    res = await fetch("http://localhost:3001/discord-api/get-user", {
      method: "GET",
      headers: { authorization: `${tokenType} ${token}` },
    });

    if (!res.ok) {
      alert("Fail to login");
      return;
    }
  } catch (err) {
    alert("Fail to login");
    console.error("Fail to get user\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.user;
  } catch (err) {
    alert("Fail to login");
    console.error("Fail to covert response to json\n");
    return;
  }
}
