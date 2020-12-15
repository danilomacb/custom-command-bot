import { Route, Router } from "react-router-dom";

import "./styles/global.scss";
import DiscordUserProvider from "./context/DiscordUserContext";
import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiscordServer from "./pages/DiscordServer";

function App() {
  return (
    <DiscordUserProvider>
      <Router history={history}>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/discord-server/:discordServerId/" component={DiscordServer} />
      </Router>
    </DiscordUserProvider>
  );
}

export default App;
