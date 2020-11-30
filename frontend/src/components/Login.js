import { useEffect, useContext } from "react";
import queryString from "query-string";

import history from "../history";
import { UserContext } from "../context/UserContext";
import { getUser } from "../services/UserService";

function Login({ location }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    let tokenType = localStorage.tokenType;
    let token = localStorage.token;

    if (!tokenType && !token && location.hash) {
      const parsedHash = queryString.parse(location.hash);
      tokenType = parsedHash.token_type;
      token = parsedHash.access_token;
    }

    if (tokenType && token) {
      localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("token", token);

      getUser(tokenType, token)
        .then((user) => setUser(user))
        .catch((err) => console.log("Fail to get user\n", err));

      history.push("/");
    }
  }, [location.hash, setUser]);

  return (
    <a href="https://discord.com/api/oauth2/authorize?client_id=777841418483662868&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20guilds">
      <button>Login</button>
    </a>
  );
}

export default Login;
