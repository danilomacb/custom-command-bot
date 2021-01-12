export async function addTextCommand(discordServerId, tag, message) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
      body: JSON.stringify({ tag, message }),
    });
  } catch (err) {
    alert("Fail to add text command");
    console.error("Fail to add text command\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }

  alert(jsonRes.message);
}

export async function listAllTextCommands(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/list-all`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    alert("Fail to list all text commands");
    console.error("Fail to list all text commands\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    alert("Fail to list all text commands");
    console.error("Fail to convert response to json\n", err);
    return;
  }

  if (!res.ok) {
    alert(jsonRes.message);
    return;
  }

  return jsonRes.data.textCommands;
}

export async function updateTextCommand(discordServerId, textCommandId, tag, message) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/update/${textCommandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
      body: JSON.stringify({ tag, message }),
    });
  } catch (err) {
    alert("Fail to update text command");
    console.error("Fail to update text command\n", err);
    return;
  }

  let jsonRes;
  try {
    jsonRes = await res.json();
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }

  alert(jsonRes.message);
}

export async function removeTextCommand(discordServerId, textCommandId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/remove/${textCommandId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });
  } catch (err) {
    alert("Fail to remove text command");
    console.error("Fail to remove text command\n", err);
  }
}
