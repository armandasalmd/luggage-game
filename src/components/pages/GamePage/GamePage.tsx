import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { GameLayout } from "@components/templates";

const GamePage: FC = () => {
  const history = useHistory();
  const { gameId }: any = useParams();

  function onSurrender() {
    history.push("/auth/login");
  }

  useEffect(() => {
    // Disable scrolling on mobiles while playing
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    }
  }, [])

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
