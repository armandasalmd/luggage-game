import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import "./LobbyPage.scss";
import { DashboardNavbar } from "@components/organisms";
import { LobbyDetails, LobbyPlayers } from "@components/molecules";
import { playerJoinedListener, playerLeftListener } from "@socket/lobby";
import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import { playerJoined, playerLeft } from "@redux/actions";
import SocketManager from "@socket/SocketManager";

const LobbyPage: FC = () => {
  const dispatch = useDispatch();
  const lobbyState = useSelector((state: RootState) => state.lobby);
  const { user } = useSelector((state: RootState) => state.user);

  function onPlayerJoin(player: ILobbyPlayer) {
    dispatch(playerJoined(player));
  }
  
  function onPlayerLeft(username: string) {
    dispatch(playerLeft(username));
  }

  useEffect(() => {
    playerJoinedListener(onPlayerJoin);
    playerLeftListener(onPlayerLeft);
    
    return () => {
      SocketManager.getInstance().removeAllListeners();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <DashboardNavbar name={user.username} coins={user.coins} />
      <div className="lobby">
        <LobbyDetails className="lobby__card" />
        <div className="lobby__divider"></div>
        <LobbyPlayers players={lobbyState.players} playersCount={lobbyState.playerCount} />
      </div>
    </div>
  );
};

export default LobbyPage;
