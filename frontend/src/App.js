import { Route, Router } from "react-router-dom";

import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DiscordServer from "./pages/DiscordServer";

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/:discordServerId" component={DiscordServer} />
    </Router>
  );
}

export default App;
