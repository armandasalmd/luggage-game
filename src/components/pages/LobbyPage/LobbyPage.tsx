import { FC } from "react";
import { useParams } from "react-router-dom";
import "./LobbyPage.scss";
import { LobbyPlayer } from "@components/atoms";
import { DashboardNavbar } from "@components/organisms";
import { LobbyDetails } from "@components/molecules";
import { IGameDetails, IPlayer } from "@utils/game/Game";

const gameDetails: IGameDetails = {
  isPrivate: true,
  playerCount: 5,
  reward: 500,
  rules: "classical",
};

const player1: IPlayer = {
  ready: true,
  username: "armandelis"
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
        <div className="lobby__players">
          <LobbyPlayer player={player1} />
          <LobbyPlayer emptyLabel="Player 2" />
          <LobbyPlayer emptyLabel="Player 3" />
          <LobbyPlayer emptyLabel="Player 4" />
          <LobbyPlayer emptyLabel="Player 5" />
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
