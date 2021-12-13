import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import "./GameActionBar.scss";
import { RootState } from "@redux/store";
import { LuggageController } from "..";
import { message } from "@components/atoms";
import { finishTurnAsync, playCardAsync } from "@socket/game";
import ActionBarAction, { ActionBarActionProps } from "./ActionBarAction";
import { clearPickCardCount } from "@redux/actions";
import EngineBase from "@utils/game/EngineBase";
import ClassicEngine from "@utils/game/ClassicEngine";

const GameActionBar: FC = () => {
  const dispatch = useDispatch();
  const { gameId }: any = useParams();
  const { activeSeatId } = useSelector(
    (state: RootState) => state.game.gameDetails
  );
  const { seatId, lastMoves, handCards } = useSelector((state: RootState) => state.game.myState);
  const { pickPlayCountItems, cardValue } = useSelector(
    (state: RootState) => state.actionBar
  );
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
    dispatch(clearPickCardCount());
    const pickedCards = EngineBase.pickCardsByValue(handCards, cardValue, count);

    playCardAsync(gameId, pickedCards)
      .then((result) => {
        if (!result.success && result.message) {
          message.error(result.message);
        }
      })
      .catch(() => {
        message.error("Unexpected error");
      });

    if (!ClassicEngine.instance.canPutMoreAfterMove(pickedCards[0], count)) {
      onFinishTurn();
    }
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

  const actionBarProps: ActionBarActionProps = {
    active,
    hasLastMove: lastMoves.length > 0,
    onFinishTurn,
    onPickCount,
    pickPlayCountItems
  };

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        <ActionBarAction {...actionBarProps} />
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};

export default GameActionBar;
