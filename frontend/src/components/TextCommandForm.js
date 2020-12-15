import { useContext } from "react";

import "../styles/form.scss";
import { TextCommandListContext } from "../context/TextCommandListContext";
import { addText, getTextCommands } from "../services/TextService";

function TextCommandForm({ discordServerId }) {
  const { setTextCommandList } = useContext(TextCommandListContext);

  let tagInput;
  let messageTextarea;

  async function handleSubmit(e) {
    e.preventDefault();

    await addText(discordServerId, tagInput.value, messageTextarea.value);

    tagInput.value = "";
    messageTextarea.value = "";

    const res = await getTextCommands(discordServerId);
    setTextCommandList(res);
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
