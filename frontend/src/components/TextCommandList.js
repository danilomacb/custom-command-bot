import { useEffect, useContext } from "react";

import { TextCommandContext } from "../context/TextCommandContext";
import { getTextCommands } from "../services/TextService";

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
    getTextCommands(discordServerId).then((res) => setTextCommandList(res));
  }, [discordServerId, setTextCommandList]);

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
            <button>Delete</button>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Text Commands List...</h1>;
}

export default TextCommandList;
