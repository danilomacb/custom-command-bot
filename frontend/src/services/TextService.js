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
    console.error(err);
  }
}
