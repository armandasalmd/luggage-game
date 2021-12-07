import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import "./LobbyPage.scss";
import { DashboardNavbar } from "@components/organisms";
import { LobbyDetails, LobbyPlayers } from "@components/molecules";

const LobbyPage: FC = () => {
  const lobbyState = useSelector((state: RootState) => state.lobby);
  const { user } = useSelector((state: RootState) => state.user);

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
