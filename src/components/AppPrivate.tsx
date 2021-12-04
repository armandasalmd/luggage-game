import { Route, Switch, Redirect } from "react-router-dom";
import { DashboardPage, GamePage, LobbyPage } from "./pages";

const AppPrivate = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route exact path="/lobby/:gameId" component={LobbyPage} />
      <Route exact path="/play/:gameId" component={GamePage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppPrivate;
