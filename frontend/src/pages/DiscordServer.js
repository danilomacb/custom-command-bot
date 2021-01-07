import { useState, useEffect, useContext } from "react";

import "../styles/tabs.scss";
import { DiscordUserContext } from "../context/DiscordUserContext";
import history from "../history";
import { listOneDiscordServer } from "../services/DiscordServerService";
import TextCommandProvider from "../context/TextCommandContext";
import TextTab from "../components/TextTab";
import MembersTab from "../components/MembersTab";

function DiscordServer({ match }) {
  const { discordServerId } = match.params;

  const { discordUser } = useContext(DiscordUserContext);

  const [tab, setTab] = useState("text");
  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    if (discordUser === "guest") {
      alert("You need to login");
      history.push("/");
      return;
    }

    if (discordUser) {
      listOneDiscordServer(discordServerId).then((res) => setDiscordServer(res));
    }
  }, [discordUser, discordServerId]);

  function changeTab(t) {
    if (tab !== t) {
      setTab(t);
    }
  }

  if (discordServer) {
    return (
      <>
        <h1>{discordServer.discordServerName}</h1>
        <div className="tabs">
          <button onClick={() => changeTab("text")}>Text</button>
          <button onClick={() => changeTab("image")}>Image</button>
          {discordServer.memberLogged.superAdm ? (
            <button onClick={() => changeTab("members")}>Members</button>
          ) : null}
        </div>

        {tab === "text" ? (
          <TextCommandProvider>
            <TextTab discordServer={discordServer} />
          </TextCommandProvider>
        ) : tab === "image" ? (
          <div>Images</div>
        ) : (
          <MembersTab discordServer={discordServer} />
        )}
      </>
    );
  }

  return <h1>Loading Discord Server...</h1>;
}

export default DiscordServer;
