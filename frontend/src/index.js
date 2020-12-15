import React from "react";
import ReactDOM from "react-dom";

import "./styles/global.scss";
import UserProvider from "./context/UserContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
