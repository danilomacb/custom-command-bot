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
  const [isAdm, setIsAdm] = useState(false);

  useEffect(() => {
    getDiscordServer(discordServerId).then((res) => {
      if (user) {
        const findSuperAdm = res.superAdms.find((superAdm) => superAdm.discordUserId === user.id);

        if (findSuperAdm) setIsAdm(true);
      }

      setDiscordServer(res);
    });
  }, [discordServerId, user]);

  if (discordServer)
    return (
      <DiscordServer
        discordServerId={discordServerId}
        discordServer={discordServer}
        isAdm={isAdm}
      />
    );

  return <h1>Loading Discord Server...</h1>;
}

export default CheckAdmDiscordServer;
