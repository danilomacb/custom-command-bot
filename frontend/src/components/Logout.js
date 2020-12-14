import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import history from "../history";

function Logout() {
  const { setUser } = useContext(UserContext);

  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenType");

        setUser("guest");

        history.push("/");
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
