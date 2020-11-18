import { Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
