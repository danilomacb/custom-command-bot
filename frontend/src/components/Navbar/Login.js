import { useEffect, useContext } from "react";
import queryString from "query-string";

import { DiscordUserContext } from "../../context/DiscordUserContext";
import { listOneDiscordUser } from "../../services/DiscordUserService";
import history from "../../history";

function Login() {
  const { discordUser, setDiscordUser } = useContext(DiscordUserContext);

  useEffect(() => {
    let tokenType = localStorage.tokenType;
    let token = localStorage.token;

    const { hash } = window.location;

    if (!tokenType && !token && hash) {
      const parsedHash = queryString.parse(hash);
      tokenType = parsedHash.token_type;
      token = parsedHash.access_token;

      localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("token", token);

      history.push("/");
    }

    if ((!discordUser || discordUser === "guest") && tokenType && token) {
      listOneDiscordUser(tokenType, token).then((res) => setDiscordUser(res));
    }

    if (!tokenType && !token && !hash) {
      setDiscordUser("guest");
    }
  }, [discordUser, setDiscordUser]);

  return (
    <a href="https://discord.com/api/oauth2/authorize?client_id=777841418483662868&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify">
      <button>Login</button>
    </a>
  );
}

export default Login;
