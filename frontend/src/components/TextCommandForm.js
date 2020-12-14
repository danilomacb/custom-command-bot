import "../styles/form.scss";
import { addText } from "../services/TextService";

function TextCommandForm({ discordServerId }) {
  let tagInput;
  let messageTextarea;

  async function handleSubmit(e) {
    e.preventDefault();

    await addText(discordServerId, tagInput.value, messageTextarea.value);

    tagInput.value = "";
    messageTextarea.value = "";
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

export default TextCommandForm;
