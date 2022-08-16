import { Switch, Route, Redirect } from "react-router-dom";
import { InstallPage } from "./pages";
import { LoginPage } from "./pages";
import { RegisterPage } from "./pages";
import { SetTokenPage } from "./pages";
import { TermsOfServicePage }  from "./pages";

const AppPublic = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/register" component={RegisterPage} />
      <Route exact path="/auth/setToken" component={SetTokenPage} />
      <Route exact path="/install" component={InstallPage} />
      <Route exact path="/terms" component={TermsOfServicePage} />
      <Route render={() => <Redirect to="/auth/login" />} />
    </Switch>
  );
};

export default AppPublic;
