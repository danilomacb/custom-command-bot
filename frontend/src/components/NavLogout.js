import { useContext } from "react";

import { UserContext } from "../context/UserContext";

function NavLogout() {
  const { setUser } = useContext(UserContext);

  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenType");

        setUser(null);
      }}
    >
      Logout
    </button>
  );
}

export default NavLogout;
