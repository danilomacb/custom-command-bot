import { useState } from "react";

import "../styles/discordServer.scss";
import Navbar from "../components/Navbar";
import TextForm from "../components/TextForm";

function DiscordServer({ match, location, discordServer }) {
  const [commandType, setCommandType] = useState("text");

  function changeCommandType(ct) {
    if (commandType !== ct) {
      setCommandType(ct);
    }
  }

  return (
    <>
      <Navbar location={location} />
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
