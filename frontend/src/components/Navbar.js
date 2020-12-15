import { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../context/UserContext";
import NavUser from "./NavUser";
import Login from "./Login";
import Logout from "./Logout";

function Navbar() {
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
          {user && user !== "guest" ? (
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
              <Login />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
