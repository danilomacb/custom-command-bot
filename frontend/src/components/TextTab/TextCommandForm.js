import { useContext } from "react";

import "../../styles/form.scss";
import { TextCommandContext } from "../../context/TextCommandContext";
import { addTextCommand, listAllTextCommands, updateTextCommand } from "../../services/TextService";

function TextCommandForm({ discordServerId }) {
  const {
    setTextCommandList,
    textCommandId,
    textCommandTag,
    textCommandMessage,
    textCommandMode,
  } = useContext(TextCommandContext);

  let tagInput;
  let messageTextarea;

  async function handleSubmit(e) {
    e.preventDefault();

    if (textCommandMode === "add") {
      await addTextCommand(discordServerId, tagInput.value, messageTextarea.value);

      tagInput.value = "";
      messageTextarea.value = "";
    }

    if (textCommandMode === "update") {
      await updateTextCommand(
        discordServerId,
        textCommandId,
        tagInput.value,
        messageTextarea.value
      );
    }

    const res = await listAllTextCommands(discordServerId);
    setTextCommandList(res);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={(input) => (tagInput = input)}
          defaultValue={textCommandTag}
          required
        />
        <textarea
          type="message"
          ref={(textarea) => (messageTextarea = textarea)}
          defaultValue={textCommandMessage}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default TextCommandForm;