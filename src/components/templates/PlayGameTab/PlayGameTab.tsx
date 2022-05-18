import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./PlayGameTab.scss";

import { message } from "@components/atoms";
import { PublicGames } from "@components/organisms";
import { setLobbyState } from "@redux/actions";
import RouteUtils from "@utils/Route";
import { joinLobbyAsync } from "@socket/lobby";
import CreateGameCard from "./CreateGameCard";
import JoinGameCard from "./JoinGameCard";
import RewardsCard from "./RewardsCard";

const DashboardCreateJoinTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  async function onCreateGame(options: any) {
    const route = RouteUtils.routes.api.lobby.create;

    try {
      const { data } = await RouteUtils.sendApiRequest(route, options);
      const { errorMessage, ...rest } = data;

      if (errorMessage) {
        message.warning(data.errorMessage);
      } else {
        joinLobbyAsync(data.roomCode).then((data: any) => {
          if (data.success) {
            dispatch(setLobbyState({ ...rest, ...options }));
            history.push("/lobby/" + data.lobbyState.roomCode);
          }
        });
      }
    } catch {
      message.error("Cannot create room");
    }
  }

  function onJoinGame(joinId: string, setJoinError: (msg: string) => void) {
    if (joinId) {
      joinLobbyAsync(joinId.toLowerCase()).then((data: any) => {
        if (data.success) {
          dispatch(setLobbyState(data.lobbyState));
          history.push("/lobby/" + data.lobbyState.roomCode);
        } else {
          setJoinError(data.errorMessage.message);
        }
      });
    } else {
      setJoinError("Room code cannot be empty");
    }
  }

  useEffect(() => {
    async function attemptReconnect() {
      const route = RouteUtils.routes.api.game.getActiveGameId;

      try {
        const { data } = await RouteUtils.sendApiRequest(route);

        if (data && data.success && data.gameId) {
          history.push(RouteUtils.routes.app.main.game.path);
        }
      } catch {
        console.warn("Cannot retrieve active game id");
      }
    }

    attemptReconnect();
  }, [history]);

  return (
    <div className="playGame">
      <div className="playGame__cardsLeft">
        <RewardsCard />
        <PublicGames />
      </div>
      <div className="playGame__cardsRight">
        <JoinGameCard onJoinGame={onJoinGame} />
        <CreateGameCard onCreateGame={onCreateGame} />
      </div>
    </div>
  );
};

export default DashboardCreateJoinTab;
