import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../context/UserContext";
import NavUser from "./NavUser";
import NavLogin from "./NavLogin";
import NavLogout from "./NavLogout";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.token;
    const tokenType = localStorage.tokenType;

    if (!user && token && tokenType) {
      fetch("http://localhost:3001/auth/user", {
        method: "GET",
        headers: { authorization: `${tokenType} ${token}` },
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setUser(jsonRes.data.user);
          console.log(jsonRes.message);
        })
        .catch((err) => console.error("Error on get user\n", err));
    }
  }, [setUser]);

  return (
    <nav>
      <ul>
        <div id="left">
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
        <div id="right">
          {user ? (
            <>
              <li id="user">
                <NavUser user={user} />
              </li>
              <li>
                <NavLogout />
              </li>
            </>
          ) : (
            <li>
              <NavLogin />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
