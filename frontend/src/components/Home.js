import { useEffect, useState } from "react";

import queryString from "query-string";

function Home({ location }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const parsedHash = queryString.parse(location.hash);

    if (parsedHash.access_token) {
      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${parsedHash.token_type} ${parsedHash.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          setUser(user)
        });
    }
  }, []);

  if(user) {
    return (
      <>
    <h1>{user.username}</h1>
    <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="user image" />
    </>
    )
  }

  return (
    <h1>Hello World</h1>
  )
}

export default Home;
