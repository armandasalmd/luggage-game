import { Route, Switch, Redirect } from "react-router-dom";
import { DashboardPage } from "./pages";

const AppPrivate = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppPrivate;
