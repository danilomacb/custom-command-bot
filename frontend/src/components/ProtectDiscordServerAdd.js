import { useContext, useEffect, useState } from "react";

import history from "../history";
import { UserContext } from "../context/UserContext";
import { LocationContext } from "../context/LocationContext";
import { getDiscordServer } from "../services/DiscordServerService";
import DiscordServerAdd from "../pages/DiscordServerAdd";

function ProtectDiscordServerAdd({ location, match }) {
  const { discordServerId } = match.params;

  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setLocation(location);
  }, [location, setLocation]);

  const { user } = useContext(UserContext);
  
  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    if (user) {
      getDiscordServer(discordServerId).then((res) => {
        const superAdmFound = res.superAdms.find((superAdm) => superAdm.discordUserId === user.id);

        if (superAdmFound) {
          setDiscordServer(res);
        } else {
          history.push("/");
        }
      });
    } else {
      history.push("/");
    }
  }, [user, discordServerId]);

  if (discordServer) {
    return <DiscordServerAdd match={match} discordServer={discordServer} />;
  }

  return <h1>Loading Discord Server Add...</h1>;
}

export default ProtectDiscordServerAdd;
