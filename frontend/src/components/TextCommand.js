import { useContext } from "react";

import "../styles/textCommand.scss";
import { TextCommandContext } from "../context/TextCommandContext";
import TextCommandList from "./TextCommandList";
import TextCommandForm from "./TextCommandForm";

function TextCommand({ discordServer }) {
  const { memberLogged, discordServerId } = discordServer;

  const {
    textCommandMode,
    setTextCommandMode,
    setTextCommandTag,
    setTextCommandMessage,
  } = useContext(TextCommandContext);

  return (
    <>
      {textCommandMode === "list" ? (
        <>
          {memberLogged.superAdm || memberLogged.adm ? (
            <button
              onClick={() => {
                setTextCommandTag("");
                setTextCommandMessage("");
                setTextCommandMode("add");
              }}
            >
              Add
            </button>
          ) : null}
          <TextCommandList discordServerId={discordServerId} memberLogged={memberLogged} />
        </>
      ) : (
        <>
          <button onClick={() => setTextCommandMode("list")}>List</button>
          <TextCommandForm discordServerId={discordServerId} />
        </>
      )}
    </>
  );
}

export default TextCommand;
