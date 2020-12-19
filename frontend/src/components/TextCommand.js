import { useState } from "react";

import TextCommandListProvider from "../context/TextCommandListContext";
import TextCommandList from "./TextCommandList";
import TextCommandForm from "./TextCommandForm";

function TextCommand({ discordServer }) {
  const { memberLogged, discordServerId } = discordServer;

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
          {memberLogged.superAdm || memberLogged.adm ? (
            <button onClick={() => changeMode("add")}>Add</button>
          ) : null}
          <TextCommandList discordServerId={discordServerId} />
        </>
      ) : (
        <>
          <button onClick={() => changeMode("list")}>List</button>
          <TextCommandForm discordServerId={discordServerId} />
        </>
      )}
    </TextCommandListProvider>
  );
}

export default TextCommand;
