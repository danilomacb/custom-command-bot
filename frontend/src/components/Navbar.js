import { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../Context/UserContext";
import NavUser from "./NavUser";
import NavLogin from "./NavLogin";
import NavLogout from "./NavLogout";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

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
