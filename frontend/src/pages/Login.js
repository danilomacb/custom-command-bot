import { useEffect, useState, useContext } from "react";
import queryString from "query-string";

import history from "../history";

function Login({ location }) {
  useEffect(() => {
    if (localStorage.token && localStorage.tokenType) {
      history.push("/");
      return;
    }

    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.access_token && parsedHash.token_type) {
      localStorage.setItem("token", parsedHash.access_token);
      localStorage.setItem("tokenType", parsedHash.token_type);

      history.push("/");
    }
  }, [location.hash]);

  return <h1>Logging...</h1>;
}

export default Login;
