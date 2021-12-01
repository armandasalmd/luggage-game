import { FC } from "react";
import "./GameLayout.scss";

import { PlayerCard } from "@components/atoms";
import { GameNavbar, GameActionBar } from "@components/organisms";
import { GameNavbarProps } from "@components/organisms/GameNavbar/GameNavbar";

interface GameLayoutProps extends GameNavbarProps {
  gameId: string;
}

const GameLayout: FC<GameLayoutProps> = (props) => {
  const { gameId, ...rest } = props;
  
  return (
    <div className="gameLayout">
      <GameNavbar {...rest} />
      <div>
        <PlayerCard username="klaidonsas" label="Luggage" />
      </div>
      <GameActionBar />
    </div>
  );
};

export default GameLayout;
