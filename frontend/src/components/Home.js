import { useEffect, useState } from "react";

import queryString from "query-string";

function Home({ location }) {
  const [token, setToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    function getLocalStorageToken() {
      const localStorageToken = localStorage.getItem(token);
      const localStorageTokenType = localStorage.getItem(tokenType);

      if (localStorageToken && localStorageTokenType) {
        setToken(localStorageToken);
        setTokenType(localStorageTokenType);
      }
    }

    window.addEventListener("storage", getLocalStorageToken);

    return () => {
      window.removeEventListener("storage", getLocalStorageToken);
    };
  }, []);

  useEffect(() => {
    if (token && tokenType) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, tokenType }),
      })
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch((err) => console.error("Error on login\n", err));
    }
  }, [token, tokenType]);

  useEffect(() => {
    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.access_token && parsedHash.token_type) {
      localStorage.setItem("token", parsedHash.access_token);
      localStorage.setItem("tokenType", parsedHash.token_type);
      setToken(parsedHash.access_token);
      setTokenType(parsedHash.token_type);
    }
  }, [location.hash]);

  if (user) {
    return (
      <>
        <h1>{user.username}</h1>
        <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="user" />
      </>
    );
  }

  return <h1>Hello World</h1>;
}

export default Home;
