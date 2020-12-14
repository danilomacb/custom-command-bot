import { useState, useEffect, useContext } from "react";

import "../styles/tabs.scss";
import { UserContext } from "../context/UserContext";
import history from "../history";
import { getDiscordServer } from "../services/DiscordServerService";
import TextCommand from "../components/TextCommand";
import MembersList from "../components/MembersList";

function DiscordServer({ match }) {
  const { discordServerId } = match.params;

  const { user } = useContext(UserContext);

  const [tab, setTab] = useState("text");
  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    if (user === "guest") {
      alert("You need to login");
      history.push("/");
      return;
    }

    if (user) {
      getDiscordServer(discordServerId).then((res) => setDiscordServer(res));
    }
  }, [user, discordServerId]);

  function changeTab(t) {
    if (tab !== t) {
      setTab(t);
    }
  }

  if (discordServer) {
    return (
      <>
        <h1>{discordServer.name}</h1>
        <div className="tabs">
          <button onClick={() => changeTab("text")}>Text</button>
          <button onClick={() => changeTab("image")}>Image</button>
          <button onClick={() => changeTab("members")}>Members</button>
        </div>

        {tab === "text" ? (
          <TextCommand discordServer={discordServer} />
        ) : tab === "image" ? (
          <div>Images</div>
        ) : (
          <MembersList discordServer={discordServer} />
        )}
      </>
    );
  }

  return <h1>Loading Discord Server...</h1>;
}

export default DiscordServer;
