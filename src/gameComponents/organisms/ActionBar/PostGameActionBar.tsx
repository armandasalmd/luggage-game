import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { message, ProfitNumber } from "@components/atoms";
import { getPlayerStatusLabel } from "@engine/index";
import ExitIcon from "@material-ui/icons/ExitToApp";
import ReadyIcon from "@material-ui/icons/Done";
import { clearGameState } from "@redux/actions";
import { RootState } from "@redux/store";
import RouteUtils from "@utils/Route";
import { ActionButton } from "../../atoms/ActionButton/ActionButton";
import { playAgainAsync } from "@socket/game";

export const PostGameActionBar: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const { status, profit } = useSelector((state: RootState) => ({
    status: state.game.myState.status,
    profit: state.game.myState.reward || 0
  }));

  function exit() {
    dispatch(clearGameState());
    history.replace(RouteUtils.routes.app.main.dashboard.path);
  }

  function playAgain() {
    setReady(true);
    playAgainAsync().then((result) => {
      if (!result.success) {
        setReady(false);
        message.error(result.message!);
      }
    });
  }

  return <div className="actionBar">
    <div className="actionBar__luggage">
      <ActionButton icon={<ExitIcon />} onClick={exit} />
      <ActionButton text={ready ? "Ready" : "Play again"} disabled={ready} freeWidth onClick={playAgain} icon={ready ? <ReadyIcon /> : null} />
    </div>
    <div className="actionBar__action">
      <div className="actionBar__postGame">
        <div>
          <h1>{getPlayerStatusLabel(status)}</h1>
          <ProfitNumber value={profit} />
        </div>
        <p>Game has ended</p>
      </div>
    </div>
  </div>;
};
