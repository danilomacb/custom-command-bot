import { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import { UserContext } from "../Context/UserContext";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li id="user">
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="user profile"
              />
              {user.username}
            </li>
          </>
        ) : (
          <li>
            <a href="https://discord.com/api/oauth2/authorize?client_id=778216582329270302&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&scope=identify">
              Login
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
