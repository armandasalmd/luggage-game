import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "@redux/store";
import AuthSwitch from "@components/AuthSwitch";
import AuthUtils from "@utils/Auth";

function App() {
  useEffect(() => {
    if (AuthUtils) {
      AuthUtils.applyUnauthorisedMiddleware();
      AuthUtils.resetAuthTokenFromStorage();
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AuthSwitch />
      </Router>
      <div id="modal-container"></div>
      <div id="screen-cover"></div>
    </Provider>
  );
}

export default App;
