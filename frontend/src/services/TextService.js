export async function addTextCommand(discordServerId, tag, message) {
  try {
    const res = await fetch(`http://localhost:3001/text/${discordServerId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
      body: JSON.stringify({ tag, message }),
    });

    if (res.status === 409) {
      alert("This command already exists");
      return;
    }

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

export async function listAllTextCommands(discordServerId) {
  let res;
  try {
    res = await fetch(`http://localhost:3001/text/${discordServerId}/list-all`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.tokenType} ${localStorage.token}`,
      },
    });

    if (!res.ok) {
      alert("Fail to list all text commands");
      return;
    }
  } catch (err) {
    alert("Fail to list all text commands");
    console.error("Fail to list all text commands\n", err);
  }

  try {
    const jsonRes = await res.json();

    return jsonRes.data.textCommands;
  } catch (err) {
    console.error("Fail to convert response to json\n", err);
    return;
  }
}

export async function updateTextCommand(discordServerId, textCommandId, tag, message) {
  try {
    const res = await fetch(
      `http://localhost:3001/text/${discordServerId}/update/${textCommandId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.tokenType} ${localStorage.token}`,
        },
        body: JSON.stringify({ tag, message }),
      }
    );

    if (!res.ok) {
      alert("Fail to update text command");
      return;
    }

    alert("Text command updated");
  } catch (err) {
    alert("Fail to update text command");
    console.error("Fail to update text command\n", err);
  }
}

export async function removeTextCommand(discordServerId, textCommandId) {
  try {
    const res = await fetch(
      `http://localhost:3001/text/${discordServerId}/remove/${textCommandId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.tokenType} ${localStorage.token}`,
        },
      }
    );

    if (!res.ok) {
      alert("Fail to remove text command");
      return;
    }

    alert("Text command removed");
  } catch (err) {
    alert("Fail to remove text command");
    console.error("Fail to remove text command\n", err);
  }
}
