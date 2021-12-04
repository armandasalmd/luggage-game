import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { GameLayout } from "@components/templates";
import { isMobile } from "react-device-detect"
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { dndOptions } from "@utils/game/Drag";

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
    };
  }, []);

  return (
    <div>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={dndOptions}>
        <GameLayout
          gameId={gameId}
          onSurrender={onSurrender}
          gamePrice={500}
          name="dragonSlayer12"
        />
      </DndProvider>
    </div>
  );
};

export default GamePage;
