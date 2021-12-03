import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "@redux/store";
import AuthSwitch from "@components/AuthSwitch";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthSwitch />
      </Router>
      <div id="modal-container"></div>
    </Provider>
  );
}

export default App;
