import { useContext, useEffect, useState } from "react";

import history from "../history";
import { UserContext } from "../context/UserContext";
import { getDiscordServer } from "../services/DiscordServerService";
import Navbar from "../components/Navbar";
import DiscordServer from "../pages/DiscordServer";

function ProtectDiscordServer({ location, match }) {
  const { discordServerId } = match.params;

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
    return <DiscordServer match={match} location={location} discordServer={discordServer} />;
  }

  return (
    <>
      <Navbar location={location} />
      <h1>Loading Discord Server...</h1>
    </>
  );
}

export default ProtectDiscordServer;
