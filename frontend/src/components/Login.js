import { useEffect, useContext } from "react";
import queryString from "query-string";

import { UserContext } from "../context/UserContext";
import { getUser } from "../services/UserService";

function Login({ location }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let tokenType = localStorage.tokenType;
    let token = localStorage.token;

    if (!tokenType && !token && location.hash) {
      const parsedHash = queryString.parse(location.hash);
      tokenType = parsedHash.token_type;
      token = parsedHash.access_token;

      localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("token", token);
    }

    if (!user && tokenType && token) {
      getUser(tokenType, token).then((user) => setUser(user));
    }
  }, [location.hash, setUser, user]);

  return (
    <a href="https://discord.com/api/oauth2/authorize?client_id=777841418483662868&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify">
      <button>Login</button>
    </a>
  );
}

export default Login;
