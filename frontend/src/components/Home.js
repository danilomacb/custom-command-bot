import { useEffect, useState, useContext } from "react";
import queryString from "query-string";

import { UserContext } from "../Context/UserContext";

function Home({ location }) {
  const [token, setToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token && localStorage.tokenType) {
      setToken(localStorage.token);
      setTokenType(localStorage.tokenType);
    }
  }, []);

  useEffect(() => {
    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.access_token && parsedHash.token_type) {
      localStorage.setItem("token", parsedHash.access_token);
      localStorage.setItem("tokenType", parsedHash.token_type);
      
      setToken(parsedHash.access_token);
      setTokenType(parsedHash.token_type);
    }
  }, [location.hash]);

  useEffect(() => {
    if (token && tokenType) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, tokenType }),
      })
        .then((res) => res.json())
        .then((userData) => setUser(userData))
        .catch((err) => console.error("Error on login\n", err));
    }
  }, [token, tokenType]);

  return <h1>Home Page</h1>;
}

export default Home;
