import { useEffect, useState } from "react";

import history from "../history";

function DiscordServer({ match }) {
  const [access, setAccess] = useState(false);
  const [guild, setGuild] = useState([]);

  useEffect(() => {
    const token = localStorage.token;
    const tokenType = localStorage.tokenType;

    if (token && tokenType) {
      fetch("http://localhost:3001/auth/guilds", {
        method: "GET",
        headers: { authorization: `${tokenType} ${token}` },
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes.message);
          const foundedGuild = jsonRes.data.guilds.find(
            (guild) => guild.id === match.params.discordServerId
          );

          if (foundedGuild) {
            setAccess(true);
            setGuild(foundedGuild);
          } else {
            alert("Access denied");
            history.push("/");
          }
        })
        .catch((err) => console.error("Error on get guilds\n", err));
    }
  }, [match.params.discordServerId]);

  if (access && guild) {
    return (
      <>
        <h1>Guild Name: {guild.name}</h1>
        <h1>Guild ID: {guild.id}</h1>
      </>
    );
  }

  return <h1>Loading...</h1>;
}

export default DiscordServer;
