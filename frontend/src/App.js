import { Route, Router } from "react-router-dom";

import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiscordServer from "./pages/DiscordServer";

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/discord-server/:discordServerId/" component={DiscordServer} />
    </Router>
  );
}

export default App;
