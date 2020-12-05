import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/tabs.scss";

function DiscordServer({ discordServerId, discordServer, isAdm }) {
  const [tab, setTab] = useState("text");

  function changeTab(t) {
    if (tab !== t) {
      setTab(t);
    }
  }

  return (
    <>
      <h1>{discordServer.name}</h1>
      <div className="tabs">
        <button onClick={() => changeTab("text")}>Text</button>
        <button onClick={() => changeTab("image")}>Image</button>
        <button onClick={() => changeTab("users")}>Users</button>
      </div>

      {tab === "text" ? (
        <>
          {isAdm ? <Link to={`/discord-server/${discordServerId}/add`}>Add</Link> : null}
          <br />
          {discordServer.textCommands.map((textCommand) => (
            <div key={textCommand._id}>
              <label>Tag: {textCommand.tag}</label>
              <div>Message: {textCommand.message}</div>
            </div>
          ))}
        </>
      ) : tab === "image" ? (
        <div>Images</div>
      ) : (
        <div>Users</div>
      )}
    </>
  );
}

export default DiscordServer;
