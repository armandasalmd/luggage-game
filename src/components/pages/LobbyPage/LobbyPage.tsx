import { FC } from "react";
import { useParams } from "react-router-dom";
import "./LobbyPage.scss";
import { DashboardNavbar } from "@components/organisms";
import { LobbyDetails, LobbyPlayers } from "@components/molecules";
import { IGameDetails, IPlayer } from "@utils/game/Game";

const gameDetails: IGameDetails = {
  isPrivate: true,
  playerCount: 5,
  reward: 500,
  rules: "classical",
};

const player1: IPlayer = {
  ready: false,
  username: "armandelis",
  seatId: 2
};

const LobbyPage: FC = () => {
  const { gameId }: any = useParams();

  return (
    <div>
      <DashboardNavbar name="armandelis" coins="1235" />
      <div className="lobby">
        <LobbyDetails
          className="lobby__card"
          gameId={gameId}
          {...gameDetails}
        />
        <div className="lobby__divider"></div>
        <LobbyPlayers players={[player1]} playersCount={gameDetails.playerCount} />
      </div>
    </div>
  );
};

export default LobbyPage;
