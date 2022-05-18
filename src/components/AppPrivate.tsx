import { Route, Switch, Redirect } from "react-router-dom";
import { DashboardPage, LobbyPage } from "./pages";
import { GamePage } from "../gameComponents/GamePage";

const AppPrivate = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route exact path="/lobby/:gameId" component={LobbyPage} />
      <Route exact path="/game" component={GamePage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppPrivate;
