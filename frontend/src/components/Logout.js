import { useContext } from "react";

import { DiscordUserContext } from "../context/DiscordUserContext";
import history from "../history";

function Logout() {
  const { setDiscordUser } = useContext(DiscordUserContext);

  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenType");

        setDiscordUser("guest");

        history.push("/");
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
