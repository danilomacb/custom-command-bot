import React from "react";
import ReactDOM from "react-dom";

import "./styles/global.scss";
import UserProvider from "./context/UserContext";
import LocationContext from "./context/LocationContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LocationContext>
        <App />
      </LocationContext>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
