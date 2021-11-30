import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "./pages";
import { RegisterPage } from "./pages";

const AppPublic = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/register" component={RegisterPage} />
      <Route render={() => <Redirect to="/auth/login" />} />
    </Switch>
  );
};

export default AppPublic;
