import { useEffect, useContext } from "react";

import { TextCommandListContext } from "../context/TextCommandListContext";
import { getTextCommands } from "../services/TextService";

function TextCommandList({ discordServerId }) {
  const { textCommandList, setTextCommandList } = useContext(TextCommandListContext);

  useEffect(() => {
    getTextCommands(discordServerId).then((res) => setTextCommandList(res));
  }, [discordServerId]);

  if (textCommandList) {
    return (
      <>
        {textCommandList.map((textCommand) => (
          <div key={textCommand._id}>
            <label>Tag: {textCommand.tag}</label>
            <div>Message: {textCommand.message}</div>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Text Commands List...</h1>;
}

export default TextCommandList;
