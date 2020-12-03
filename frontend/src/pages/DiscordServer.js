import { useEffect, useState } from "react";

import "../styles/discordServer.scss";
import history from "../history";
import Navbar from "../components/Navbar";
import TextForm from "../components/TextForm";
import { getGuilds } from "../services/GuildService";

function DiscordServer({ match, location }) {
  const [access, setAccess] = useState(false);
  const [guild, setGuild] = useState([]);

  useEffect(() => {
    const token = localStorage.token;
    const tokenType = localStorage.tokenType;

    if (tokenType && token) {
      getGuilds(tokenType, token).then((guilds) => {
        const foundedGuild = guilds.find((guild) => guild.id === match.params.discordServerId);

        if (foundedGuild) {
          setAccess(true);
          setGuild(foundedGuild);
        } else {
          alert("Access denied");
          history.push("/");
        }
      });
    } else {
      alert("Access denied");
      history.push("/");
    }
  }, [match.params.discordServerId]);

  const [commandType, setCommandType] = useState("text");

  function changeCommandType(ct) {
    if (commandType !== ct) {
      setCommandType(ct);
    }
  }

  if (access && guild) {
    return (
      <>
        <Navbar location={location} />
        <h1>{guild.name}</h1>
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

  return (
    <>
      <Navbar location={location} />
      <h1>Loading Discord Server...</h1>
    </>
  );
}

export default DiscordServer;
