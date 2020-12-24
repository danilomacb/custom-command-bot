export async function listOneMember(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/member/${discordServerId}/list-one`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to list discord server member\n", err);
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

export async function listAllMembers(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/member/${discordServerId}/list-all`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    console.error("Fail to list discord server members\n", err);
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
