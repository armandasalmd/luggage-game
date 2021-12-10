import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { isMobile } from "react-device-detect"
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import { message } from "@components/atoms";
import { GameLayout } from "@components/templates";
import { dndOptions } from "@utils/game/Drag";
import { initialiazeGameState } from "@redux/actions/gameActions";
import { RootState } from "@redux/store";
import RouteUtils from "@utils/Route";

const GamePage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId }: any = useParams();

  const gamePrice = useSelector((state: RootState) => state.lobby.gamePrice);
  const username = useSelector((state: RootState) => state.user.user.username);

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

  useEffect(() => {
    if (gameId) {
      initialiazeGameState(gameId)(dispatch).then(success => {
        if (success === false) {
          message.error("Error. Cannot join game");
          history.push(RouteUtils.routes.app.main.dashboard.path);
        }
      });
    } else {
      message.error("Incorrect room id");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={dndOptions}>
        <GameLayout
          gameId={gameId}
          onSurrender={onSurrender}
          gamePrice={gamePrice}
          name={username}
        />
      </DndProvider>
    </div>
  );
};

export default GamePage;
