import { Route, BrowserRouter } from "react-router-dom";

import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter history={history}>
      <Navbar />
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
