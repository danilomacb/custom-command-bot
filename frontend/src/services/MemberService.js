export async function getMember(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/member/${discordServerId}/get-user`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to get discord server member\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.members;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}

export async function getMembers(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/member/${discordServerId}/get-all`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to get discord server members\n", err);
    return;
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.members;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}
