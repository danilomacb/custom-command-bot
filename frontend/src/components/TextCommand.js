import { useState, useEffect } from "react";

import { getTextCommands } from "../services/TextService";
import TextCommandList from "./TextCommandList";
import TextCommandForm from "./TextCommandForm";

function TextCommand({ discordServer }) {
  const [textCommandList, setTextCommandList] = useState([]);
  const [mode, setMode] = useState("list");

  useEffect(() => {
    getTextCommands(discordServer.discordServerId).then((res) => setTextCommandList(res));
  }, [discordServer]);

  function changeMode(m) {
    if (mode !== m) {
      setMode(m);
    }
  }

  if (textCommandList) {
    return (
      <>
        {mode === "list" ? (
          <>
            <button onClick={() => changeMode("add")}>Add</button>
            <TextCommandList textCommandList={textCommandList} />
          </>
        ) : (
          <>
            <button onClick={() => changeMode("list")}>List</button>
            <TextCommandForm discordServerId={discordServer.discordServerId} />
          </>
        )}
      </>
    );
  }

  return <h1>Loading Text Command...</h1>;
}

export default TextCommand;
