import { useEffect, useContext } from "react";

import { TextCommandContext } from "../context/TextCommandContext";
import { listAllTextCommands, removeTextCommand } from "../services/TextService";

function TextCommandList({ discordServerId }) {
  const {
    textCommandList,
    setTextCommandList,
    setTextCommandMode,
    setTextCommandId,
    setTextCommandTag,
    setTextCommandMessage,
  } = useContext(TextCommandContext);

  useEffect(() => {
    listAllTextCommands(discordServerId).then((res) => setTextCommandList(res));
  }, [discordServerId, setTextCommandList]);

  async function handleRemove(textCommandId) {
    await removeTextCommand(discordServerId, textCommandId);

    const res = await listAllTextCommands(discordServerId);

    setTextCommandList(res);
  }

  if (textCommandList) {
    return (
      <>
        {textCommandList.map((textCommand) => (
          <div key={textCommand._id} className="text-command">
            <label>Tag: {textCommand.tag}</label>
            <div>Message: {textCommand.message}</div>
            <button
              onClick={() => {
                setTextCommandId(textCommand._id);
                setTextCommandTag(textCommand.tag);
                setTextCommandMessage(textCommand.message);
                setTextCommandMode("update");
              }}
            >
              Edit
            </button>
            <button onClick={() => handleRemove(textCommand._id)}>Delete</button>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Text Commands List...</h1>;
}

export default TextCommandList;
