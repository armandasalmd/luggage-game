import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "@redux/store";
import "./LobbyPage.scss";
import { DashboardNavbar } from "@components/organisms";
import { LobbyDetails, LobbyPlayers } from "@components/molecules";
import {
  playerJoinedListener,
  playerLeftListener,
  leaveLobbyAsync,
  joinLobbyAsync,
  gameStartListener,
  playerReadyListener
} from "@socket/lobby";
import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import { playerJoined, playerLeft, setLobbyState, setPlayerReady } from "@redux/actions";
import SocketManager from "@socket/SocketManager";
import RouteUtils from "@utils/Route";
import { message } from "@components/atoms";
import { fetchAndCacheCards } from "@utils/game/Card";

const LobbyPage: FC = () => {
  const { gameId }: any = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const lobbyState = useSelector((state: RootState) => state.lobby);
  const { user } = useSelector((state: RootState) => state.user);

  function onPlayerJoin(player: ILobbyPlayer) {
    dispatch(playerJoined(player));
  }

  function onPlayerLeft(username: string) {
    dispatch(playerLeft(username));
  }
  
  function onGameStart() {
    history.push(RouteUtils.routes.app.main.game.path + "/" + lobbyState.roomCode);
  }
  
  function onPlayerReady(username: string) {
    dispatch(setPlayerReady(username));
  }

  function attemptRoomJoin(roomId: string) {
    joinLobbyAsync(roomId).then(function (data) {
      if (data.success) {
        dispatch(setLobbyState(data.lobbyState));
      } else {
        message.error("Cannot join requested room");
        history.push(RouteUtils.routes.app.main.dashboard.path);
      }
    });
  }

  useEffect(() => {
    if (gameId && !lobbyState.roomCode) {
      // page was entered using URL - attempt joining the room
      attemptRoomJoin(gameId);
    }

    playerJoinedListener(onPlayerJoin);
    playerLeftListener(onPlayerLeft);
    playerReadyListener(onPlayerReady);
    gameStartListener(onGameStart);

    setTimeout(fetchAndCacheCards);

    return () => {
      SocketManager.getInstance().removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <DashboardNavbar
        onLogout={leaveLobbyAsync.bind(this, user.username)}
      />
      <div className="lobby">
        <LobbyDetails className="lobby__card" startGame={onGameStart} />
        <div className="lobby__divider"></div>
        <LobbyPlayers
          players={lobbyState.players}
          playersCount={lobbyState.playerCount}
        />
      </div>
    </div>
  );
};

export default LobbyPage;
