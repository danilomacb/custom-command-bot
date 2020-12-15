import { useState } from "react";

import TextCommandListProvider from "../context/TextCommandListContext";
import TextCommandList from "./TextCommandList";
import TextCommandForm from "./TextCommandForm";

function TextCommand({ discordServer }) {
  const [mode, setMode] = useState("list");

  function changeMode(m) {
    if (mode !== m) {
      setMode(m);
    }
  }

  return (
    <TextCommandListProvider>
      {mode === "list" ? (
        <>
          <button onClick={() => changeMode("add")}>Add</button>
          <TextCommandList discordServerId={discordServer.discordServerId} />
        </>
      ) : (
        <>
          <button onClick={() => changeMode("list")}>List</button>
          <TextCommandForm discordServerId={discordServer.discordServerId} />
        </>
      )}
    </TextCommandListProvider>
  );
}

export default TextCommand;
