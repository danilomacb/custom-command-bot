import { Route, Router } from "react-router-dom";

import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
