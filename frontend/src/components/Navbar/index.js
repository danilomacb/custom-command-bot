import { useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.scss";
import { DiscordUserContext } from "../../context/DiscordUserContext";
import NavUser from "./NavUser";
import Login from "./Login";
import Logout from "./Logout";

function Navbar() {
  const { discordUser } = useContext(DiscordUserContext);

  return (
    <nav>
      <ul>
        <div id="left">
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
        <div id="right">
          {discordUser && discordUser !== "guest" ? (
            <>
              <li id="discord-user">
                <NavUser discordUser={discordUser} />
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
