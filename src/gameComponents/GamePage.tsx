import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { RootState } from "@redux/store";
import "./GamePage.scss";

import { GameLayout } from "./templates";
import { Settings, GameStatus } from "@engine/index";
import RouteUtils from "@utils/Route";
import { Loader, message } from "@components/atoms";
import {
  subscribeAsync,
  gameDetailsListener,
  theEndListener,
  luggageTakenListener,
  gameStartListener,
  playerClickedPlayAgain
} from "@socket/game";
import {
  gameEnded,
  loadInitialGameState,
  luggageUpdate,
  playerPlayAgain,
  updateGameDetails,
} from "@redux/actions";
import { surrenderAsync } from "@socket/game";

export const GamePage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const settings = Settings.getSettings();
  const { gameStatus, username } = useSelector((state: RootState) => ({
    gameStatus: state.game.status,
    username: state.user.user.username
  }));
  const loading = gameStatus === GameStatus.Loading;
  const classes = classNames("gameRoot", "gameRoot--" + settings.gameTheme);

  function onSurrenderClick() {
    surrenderAsync().then(() =>
      message.information("You surrendered the game")
    );
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.oncontextmenu = e => false; // disable right click, and long press to save image

    return () => {
      document.body.style.overflow = "auto";
      document.oncontextmenu = null;
    };
  });

  useEffect(() => {
    subscribeAsync().then(({ gameState, success }) => {
      if (success) {
        dispatch(loadInitialGameState(gameState));
      } else {
        history.replace(RouteUtils.routes.app.main.dashboard.path);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const detailsCancel = gameDetailsListener((details) =>
      dispatch(updateGameDetails(details))
    );
    const endCancel = theEndListener((details) => dispatch(gameEnded(details, username)));
    const luggageCancel = luggageTakenListener((details) =>
      dispatch(luggageUpdate(details))
    );
    const gameRestartCancel = gameStartListener(window.location.reload);
    const playerReadyCancel = playerClickedPlayAgain((username) => 
      dispatch(playerPlayAgain(username)));

    return () => {
      detailsCancel();
      endCancel();
      luggageCancel();
      gameRestartCancel();
      playerReadyCancel();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div id="gameRoot" className={classes}>
      {!loading && <GameLayout onSurrender={onSurrenderClick} />}
      {loading && (
        <div className="gameRoot__loader">
          <Loader color="secondary" text="Joining requested game..." />
        </div>
      )}
    </div>
  );
};
