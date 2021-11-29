import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "./pages";

const AppPublic = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginPage} />
      <Route render={() => <Redirect to="/auth/login" />} />
    </Switch>
  );
};

export default AppPublic;
