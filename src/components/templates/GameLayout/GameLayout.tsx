import { FC, useState } from "react";
import "./GameLayout.scss";

import { RewardAnimation } from "@components/atoms";
import { GameNavbar, GameActionBar } from "@components/organisms";
import { GameNavbarProps } from "@components/organisms/GameNavbar/GameNavbar";
import { Playground } from "@components/templates";

interface GameLayoutProps extends GameNavbarProps {
  gameId: string;
}

const GameLayout: FC<GameLayoutProps> = (props) => {
  const { gameId, ...rest } = props;
  const [reward, setReward] = useState(500);

  return (
    <div className="gameLayout">
      <GameNavbar {...rest} />
      <Playground />
      <GameActionBar />
      <RewardAnimation reward={reward} afterAnimation={() => setReward(0)} />
    </div>
  );
};

export default GameLayout;
