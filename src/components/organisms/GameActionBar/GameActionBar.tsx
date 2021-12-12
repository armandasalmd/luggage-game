import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import "./GameActionBar.scss";
import { RootState } from "@redux/store";
import { LuggageController } from "..";
import { message } from "@components/atoms";
import PickCountAction from "./PickCountAction";
import PlayOrTakeAction from "./PlayOrTakeAction";
import PlayOrFinishAction from "./PlayOrFinishAction";
import { finishTurnAsync } from "@socket/game";

const GameActionBar: FC = () => {
  const { gameId }: any = useParams();
  const { activeSeatId } = useSelector(
    (state: RootState) => state.game.gameDetails
  );
  const { seatId } = useSelector((state: RootState) => state.game.myState);
  const { pickPlayCountItems } = useSelector(
    (state: RootState) => state.actionBar
  );
  const { lastMoves } = useSelector((state: RootState) => state.game.myState);
  const active = activeSeatId ? activeSeatId === seatId : false;
  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  useEffect(() => {
    let timeout: any;

    if (active === true) {
      timeout = setTimeout(() => {
        onFinishTurn();
      }, 30000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line
  }, [active]);

  function onPickCount(count: number) {
    message.information(count.toString());
  }

  function onFinishTurn() {
    finishTurnAsync(gameId)
      .then((result) => {
        if (!result.success) message.error(result.message);
      })
      .catch(() => {
        message.error("Unexpected error");
      });
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        {active && pickPlayCountItems.length > 1 && (
          <PickCountAction
            pickOptions={pickPlayCountItems}
            onSelect={onPickCount}
          />
        )}
        {active && lastMoves.length <= 0 && pickPlayCountItems.length <= 1 && (
          <PlayOrTakeAction onTake={onFinishTurn} />
        )}
        {active && lastMoves.length > 0 && pickPlayCountItems.length <= 1 && (
          <PlayOrFinishAction onFinish={onFinishTurn} />
        )}
        {!active && <p>Wait for your turn</p>}
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};

export default GameActionBar;
