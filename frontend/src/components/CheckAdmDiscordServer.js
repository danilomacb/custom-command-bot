import { useEffect, useState, useContext } from "react";

import { getDiscordServer } from "../services/DiscordServerService";
import { UserContext } from "../context/UserContext";
import { LocationContext } from "../context/LocationContext";
import DiscordServer from "../pages/DiscordServer";

function CheckAdmDiscordServer({ match, location }) {
  const { discordServerId } = match.params;

  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setLocation(location);
  }, [location, setLocation]);

  const { user } = useContext(UserContext);

  const [discordServer, setDiscordServer] = useState(null);
  const [superAdm, setSuperAdm] = useState(false);

  useEffect(() => {
    getDiscordServer(discordServerId).then((res) => {
      if (user) {
        const memberFound = res.members.find((member) => member.discordUserId === user.id);

        if (memberFound.superAdm) setSuperAdm(true);
      }

      setDiscordServer(res);
    });
  }, [discordServerId, user]);

  if (discordServer)
    return (
      <DiscordServer
        discordServerId={discordServerId}
        discordServer={discordServer}
        superAdm={superAdm}
      />
    );

  return <h1>Loading Discord Server...</h1>;
}

export default CheckAdmDiscordServer;
