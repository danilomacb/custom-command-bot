import { useState } from "react";

import "../styles/discordServer.scss";
import TextForm from "../components/TextForm";

function DiscordServer({ match, discordServer }) {
  const [commandType, setCommandType] = useState("text");

  function changeCommandType(ct) {
    if (commandType !== ct) {
      setCommandType(ct);
    }
  }

  return (
    <>
      <h1>{discordServer.name}</h1>
      <div id="command-types-buttons">
        <button onClick={() => changeCommandType("text")}>Text</button>
        <button onClick={() => changeCommandType("image")}>Image</button>
      </div>
      {commandType === "text" ? (
        <TextForm discordServerId={match.params.discordServerId} />
      ) : (
        <h1>ImageForm</h1>
      )}
    </>
  );
}

export default DiscordServer;
