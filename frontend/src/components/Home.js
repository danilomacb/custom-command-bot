import { useEffect, useState } from "react";

import queryString from "query-string";

function Home({ location }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.access_token) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parsedHash }),
      })
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch((err) => console.error("Error on login"));
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
