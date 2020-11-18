import { Link } from "react-router-dom";

import "../styles/navbar.scss";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="https://discord.com/api/oauth2/authorize?client_id=778216582329270302&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&scope=identify">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
