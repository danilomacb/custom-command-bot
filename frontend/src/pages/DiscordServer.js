import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { getDiscordServer } from "../services/DiscordServerService";
import { LocationContext } from "../context/LocationContext";

function DiscordServer({ match, location }) {
  const { discordServerId } = match.params;

  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setLocation(location);
  }, [location, setLocation]);

  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    getDiscordServer(discordServerId).then((res) => {
      setDiscordServer(res);
    });
  }, [discordServerId]);

  if (discordServer) {
    return (
      <>
        <h1>{discordServer.name}</h1>
        <Link to={`/discord-server/${discordServerId}/add`}>Add</Link>
        <br />
        {discordServer.textCommands.map((textCommand) => (
          <div key={textCommand._id}>
            <label>Tag: {textCommand.tag}</label>
            <div>Message: {textCommand.message}</div>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Discord Server...</h1>;
}

export default DiscordServer;
