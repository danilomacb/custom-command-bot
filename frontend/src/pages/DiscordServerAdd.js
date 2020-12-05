import { useState } from "react";

import "../styles/tabs.scss";
import TextForm from "../components/TextForm";

function DiscordServer({ match, discordServer }) {
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
      </div>
      {tab === "text" ? (
        <TextForm discordServerId={match.params.discordServerId} />
      ) : (
        <h1>ImageForm</h1>
      )}
    </>
  );
}

export default DiscordServer;
