import { useEffect, useContext } from "react";
import queryString from "query-string";

import history from "../history";
import { UserContext } from "../context/UserContext";
import { getUser } from "../services/UserService";

function Login({ location }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token && localStorage.tokenType) {
      history.push("/");
      return;
    }

    const parsedHash = queryString.parse(location.hash);
    const tokenType = parsedHash.token_type;
    const token = parsedHash.access_token;

    if (tokenType && token) {
      localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("token", token);

      getUser(tokenType, token)
        .then((user) => setUser(user))
        .catch((err) => console.log("Fail to get user\n", err));

      history.push("/");
    }
  }, [location.hash]);

  return <h1>Logging...</h1>;
}

export default Login;
