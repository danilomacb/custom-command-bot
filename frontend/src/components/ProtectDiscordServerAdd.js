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
  }, [location]);

  const { user } = useContext(UserContext);

  const tokenType = localStorage.tokenType;
  const token = localStorage.token;

  const [discordServer, setDiscordServer] = useState(null);

  useEffect(() => {
    if (tokenType && token && user) {
      getDiscordServer(discordServerId).then((res) => {
        const findSuperAdm = res.superAdms.find((superAdm) => superAdm.discordUserId === user.id);

        if (findSuperAdm) {
          setDiscordServer(res);
        } else {
          history.push("/");
        }
      });
    }
  }, [tokenType, token, user, discordServerId]);

  if (discordServer) {
    return <DiscordServerAdd match={match} discordServer={discordServer} />;
  }

  return <h1>Loading Discord Server Add...</h1>;
}

export default ProtectDiscordServerAdd;
