import { useContext, useEffect } from "react";

import { LocationContext } from "../context/LocationContext";

function Home({ location }) {
  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setLocation(location);
  }, [location, setLocation]);

  return <h1>Home Page</h1>;
}

export default Home;
