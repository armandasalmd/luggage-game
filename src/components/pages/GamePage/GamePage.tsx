import { FC } from "react";
import { useParams } from "react-router-dom";

import { GameLayout } from "@components/templates";

const GamePage: FC = () => {
  const { gameId }: any = useParams();

  function onSurrender() {
    console.log("Surrender");
  }

  return (
    <div>
      <GameLayout
        gameId={gameId}
        onSurrender={onSurrender}
        gamePrice={500}
        name="dragonSlayer12"
      />
    </div>
  );
};

export default GamePage;
