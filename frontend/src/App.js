import { Route, Router } from "react-router-dom";

import history from "./history";
import Home from "./pages/Home";
import DiscordServer from "./pages/DiscordServer";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route exact path="/discord-server/:discordServerId" component={DiscordServer} />
    </Router>
  );
}

export default App;
