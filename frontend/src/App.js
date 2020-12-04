import { Route, Router } from "react-router-dom";

import history from "./history";
import Home from "./pages/Home";
import DiscordServer from "./pages/DiscordServer";
import ProtectDiscordServerAdd from "./components/ProtectDiscordServerAdd";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route exact path="/discord-server/:discordServerId/" component={DiscordServer} />
      <Route
        exact
        path="/discord-server/:discordServerId/add"
        component={ProtectDiscordServerAdd}
      />
    </Router>
  );
}

export default App;
