import { useEffect, useContext } from "react";
import queryString from "query-string";

import history from "../history";
import { UserContext } from "../Context/UserContext";

function Login({ location }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token && localStorage.tokenType) {
      history.push("/");
      return;
    }

    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.token_type && parsedHash.access_token) {
      localStorage.setItem("tokenType", parsedHash.token_type);
      localStorage.setItem("token", parsedHash.access_token);

      fetch("http://localhost:3001/auth/user", {
        method: "GET",
        headers: { authorization: `${parsedHash.token_type} ${parsedHash.access_token}` },
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setUser(jsonRes.data.user);
          console.log(jsonRes.message);
        })
        .catch((err) => console.error("Error on get user\n", err));

      history.push("/");
    }
  }, [location.hash]);

  return <h1>Logging...</h1>;
}

export default Login;
