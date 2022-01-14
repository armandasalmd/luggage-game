import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./PlayGameTab.scss";
import { message } from "@components/atoms";
import { PublicGames } from "@components/organisms";
import ActiveGameCard from "./ActiveGameCard";
import RouteUtils from "@utils/Route";
import GlobalUtils from "@utils/Global";
import { setLobbyState, addCoins } from "@redux/actions";
import { joinLobbyAsync } from "@socket/lobby";
import { useSurrender } from "@hooks/useSurrender";
import CreateGameCard from "./CreateGameCard";
import JoinGameCard from "./JoinGameCard";
import RewardsCard from "./RewardsCard";

const DashboardCreateJoinTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loss, surrender] = useSurrender();
  const [activeGameId, setActiveGameId] = useState("");

  async function onCreateGame(options: any) {
    const route = RouteUtils.routes.api.lobby.create;

    try {
      const { data } = await RouteUtils.sendApiRequest(route, options);
      const { errorMessage, ...rest } = data;

      if (errorMessage) {
        message.warning(data.errorMessage);
      } else {
        joinLobbyAsync(data.roomCode).then((data) => {
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
      joinLobbyAsync(joinId.toLowerCase()).then((data) => {
        if (data.success) {
          dispatch(setLobbyState(data.lobbyState));
          history.push("/lobby/" + data.lobbyState.roomCode);
        } else {
          setJoinError(data.errorMessage.message);
        }
      });
    }
  }

  function onReconnect() {
    history.push("/play/" + activeGameId);
  }

  function onSurrender() {
    GlobalUtils.callIfFunction(surrender);
    setActiveGameId("");
    dispatch(addCoins(-loss));
  }

  useEffect(() => {
    async function fetchData() {
      const route = RouteUtils.routes.api.game.getActiveGameId;

      try {
        const { data } = await RouteUtils.sendApiRequest(route);

        if (data && data.success) setActiveGameId(data.roomId);
      } catch {
        console.warn("Cannot retrieve active game id");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (loss > 0) {
      message.information("You lost " + loss + " coins");
    } else if (loss === 0) {
      message.success("Game finished with no rewards");
    }
  }, [loss]);

  if (activeGameId) {
    return (
      <ActiveGameCard
        activeGameId={activeGameId}
        onSurrender={onSurrender}
        onReconnect={onReconnect}
      />
    );
  }

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
