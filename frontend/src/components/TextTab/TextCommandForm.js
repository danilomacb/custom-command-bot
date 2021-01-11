import { useContext, useState } from "react";

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

  const [tagChars, setTagChars] = useState(textCommandTag.length || 0);
  const [messageChars, setMessageChars] = useState(textCommandMessage.length || 0);

  let tagInput;
  let messageTextarea;

  async function handleSubmit(e) {
    e.preventDefault();

    if (tagChars > process.env.REACT_APP_MAX_TAG_LENGTH) {
      alert("Tag too long");
      return;
    }

    if (messageChars > process.env.REACT_APP_MAX_MESSAGE_LENGTH) {
      alert("Message too long");
      return;
    }

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
        <label htmlFor="tag">
          Tag ({tagChars} / {process.env.REACT_APP_MAX_TAG_LENGTH})
        </label>
        <input
          type="text"
          name="tag"
          ref={(input) => (tagInput = input)}
          defaultValue={textCommandTag}
          onChange={(e) => setTagChars(e.target.value.length)}
          required
        />
        <label htmlFor="message">
          Message ({messageChars} / {process.env.REACT_APP_MAX_MESSAGE_LENGTH})
        </label>
        <textarea
          name="message"
          ref={(textarea) => (messageTextarea = textarea)}
          defaultValue={textCommandMessage}
          onChange={(e) => setMessageChars(e.target.value.length)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default TextCommandForm;
