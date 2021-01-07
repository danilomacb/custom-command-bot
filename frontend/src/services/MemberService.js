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
    alert("Fail to list discord server member");
    console.error("Fail to list discord server member\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    alert("Fail to list discord server member");
    console.error("Fail to convert response to json\n", err);
    return;
  }

  if (!res.ok) {
    alert(jsonRes.message);
    return;
  }

  return jsonRes.data.members;
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
    alert("Fail to list discord server members");
    console.error("Fail to list discord server members\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    alert("Fail to list discord server members");
    console.error("Fail to convert response to json\n", err);
    return;
  }

  if (!res.ok) {
    alert(jsonRes.message);
    return;
  }

  return jsonRes.data.members;
}
