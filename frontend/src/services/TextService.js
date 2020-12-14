export async function addText(discordServerId, tag, message) {
  try {
    const res = await fetch(`http://localhost:3001/text/${discordServerId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
      body: JSON.stringify({ tag, message }),
    });

    if (!res.ok) {
      alert("Fail to add text command");
      return;
    }

    alert("Text command added");
  } catch (err) {
    alert("Fail to add text command");
    console.error("Fail to add text command\n", err);
  }
}

export async function getTextCommands(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/get-all`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });

    if (!res.ok) {
      alert("Fail to get all text commands");
      return;
    }
  } catch (err) {
    alert("Fail to get all text commands");
    console.error("Fail to get all text commands\n", err);
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.textCommands;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}
