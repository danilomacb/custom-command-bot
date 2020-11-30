import { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../context/UserContext";
import NavUser from "./NavUser";
import Login from "./Login";
import NavLogout from "./NavLogout";

function Navbar({ location }) {
  const { user } = useContext(UserContext);

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
              <Login location={location} />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
