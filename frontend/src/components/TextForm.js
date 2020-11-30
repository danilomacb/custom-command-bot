import "../styles/form.scss";

function TextForm({ discordServerId }) {
  let tagInput;
  let messageTextarea;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/text/${discordServerId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.tokenType} ${localStorage.token}`,
        },
        body: JSON.stringify({ tag: tagInput.value, message: messageTextarea.value }),
      });

      tagInput.value = "";
      messageTextarea.value = "";

      if (!res.ok) {
        alert("Fail to add new text command");
        return;
      }

      alert("New text command added");
    } catch (err) {
      alert("Fail to add new text command");
      console.error("Fail to add new text command\n", err);
      return;
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={(input) => (tagInput = input)} />
        <textarea type="message" ref={(textarea) => (messageTextarea = textarea)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default TextForm;
