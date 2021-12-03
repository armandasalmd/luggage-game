import { FC } from "react";
import "./GameLayout.scss";

import { GameNavbar, GameActionBar } from "@components/organisms";
import { GameNavbarProps } from "@components/organisms/GameNavbar/GameNavbar";
import { Playground } from "@components/templates";

interface GameLayoutProps extends GameNavbarProps {
  gameId: string;
}

const GameLayout: FC<GameLayoutProps> = (props) => {
  const { gameId, ...rest } = props;
  
  return (
    <div className="gameLayout">
      <GameNavbar {...rest} />
      <Playground />
      <GameActionBar />
    </div>
  );
};

export default GameLayout;
