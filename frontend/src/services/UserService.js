export async function getUser(tokenType, token) {
  let res;
  try {
    res = await fetch("http://localhost:3001/discord-api/get-user", {
      method: "GET",
      headers: { authorization: `${tokenType} ${token}` },
    });
  } catch (err) {
    alert("Fail to login");
    console.error("Error on get user\n", err);
    console.trace();
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.user;
  } catch (err) {
    alert("Fail to login");
    console.error("Error on covert response to json\n", err);
    console.trace();
    return;
  }
}
