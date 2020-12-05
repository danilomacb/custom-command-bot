import { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../context/UserContext";
import { LocationContext } from "../context/LocationContext";
import NavUser from "./NavUser";
import Login from "./Login";
import Logout from "./Logout";

function Navbar() {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);

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
                <Logout />
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
