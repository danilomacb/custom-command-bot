import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/tabs.scss";
import TextForm from "../components/TextForm";

function DiscordServer({ match, discordServer }) {
  const { discordServerId } = match.params;

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
        <Link to={`/discord-server/${discordServerId}`}>Back</Link>
        <button onClick={() => changeTab("text")}>Text</button>
        <button onClick={() => changeTab("image")}>Image</button>
      </div>
      {tab === "text" ? <TextForm discordServerId={discordServerId} /> : <h1>ImageForm</h1>}
    </>
  );
}

export default DiscordServer;
