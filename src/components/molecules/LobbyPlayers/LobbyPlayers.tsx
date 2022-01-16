import { FC } from "react";
import { IPlayer } from "@utils/game/Game";
import { LobbyPlayer } from "@components/atoms";

interface LobbyPlayersProps {
  players: IPlayer[];
  playersCount: number;
  myUsername: string;
  onWave(): void;
}

const LobbyPlayers: FC<LobbyPlayersProps> = (props) => {
  const players = [];

  function getPlayerInfo(seatId: number): IPlayer | undefined {
    return props.players.find(function (player) {
      return player.seatId === seatId;
    });
  }

  for (let i = 0; i < props.playersCount; i++) {
    const info = getPlayerInfo(i + 1);

    if (info) {
      players.push(
        <LobbyPlayer
          player={info}
          key={i}
          itsMe={info.username === props.myUsername}
          onWave={props.onWave}
        />
      );
    } else {
      players.push(<LobbyPlayer emptyLabel={`Player ${i + 1}`} key={i} />);
    }
  }

  return <div className="lobby__players">{players}</div>;
};

export default LobbyPlayers;
