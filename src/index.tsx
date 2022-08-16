import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./serviceWorkerRegistration";
import "@styles/Global.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

registerServiceWorker();