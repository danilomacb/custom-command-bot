import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDiscordServer } from "../services/DiscordServerService";
import Navbar from "../components/Navbar";

function DiscordServer({ match, location }) {
  const { discordServerId } = match.params;

  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    getDiscordServer(discordServerId).then((res) => {
      setDiscordServer(res);
    });
  }, []);

  if (discordServer) {
    return (
      <>
        <Navbar location={location} />
        <h1>{discordServer.name}</h1>
        <Link to={`/discord-server/${discordServerId}/add`}>Add</Link>
        <br />
        {discordServer.textCommands.map((textCommand) => (
          <>
            <label>Tag: {textCommand.tag}</label>
            <div>Message: {textCommand.message}</div>
          </>
        ))}
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
