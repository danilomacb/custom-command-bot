import { useEffect, useContext } from "react";

import { UserContext } from "../Context/UserContext";

function Home() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.token;
    const tokenType = localStorage.tokenType;

    if (token && tokenType) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, tokenType }),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setUser(jsonRes.data.user);
          console.log(jsonRes.message);
        })
        .catch((err) => console.error("Error on login\n", err));
    }
  }, []);

  return <h1>Home Page</h1>;
}

export default Home;
