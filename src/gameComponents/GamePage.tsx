import { FC } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { GameLayout } from "./templates";
import { Settings } from "@engine/index";
import "./GamePage.scss";

export const GamePage: FC = () => {
  const settings = Settings.getSettings();
  const history = useHistory();
  // const { gameId }: any = useParams();

  const classes = classNames("gameRoot", "gameRoot--" + settings.gameTheme);

  function onSurrenderClick() {
    history.replace("/")
  }

  return (
    <div id="gameRoot" className={classes}>
      <GameLayout onSurrender={onSurrenderClick} />
    </div>
  );
};
