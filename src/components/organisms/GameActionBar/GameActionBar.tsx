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
import { clearPickCardCount, setLuggageUsed } from "@redux/actions";
import EngineBase from "@utils/game/EngineBase";
import ClassicEngine from "@utils/game/ClassicEngine";
import FinishedGameAction from "./FinishedGameAction";

const GameActionBar: FC = () => {
  const dispatch = useDispatch();
  const { gameId }: any = useParams();
  const { activeSeatId, sourceCardsCount } = useSelector(
    (state: RootState) => state.game.gameDetails
  );
  const { seatId, lastMoves, handCards, playerState } = useSelector((state: RootState) => state.game.myState);
  const { reward } = useSelector((state: RootState) => state.game);
  const { pickPlayCountItems, cardValue } = useSelector(
    (state: RootState) => state.actionBar
  );
  const active = activeSeatId ? activeSeatId === seatId : false;
  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  const luggageTime = active && handCards.length === 0 && sourceCardsCount === 0;

  useEffect(() => {
    let timeout: any;

    if (active === true) {
      timeout = setTimeout(() => {
        onFinishTurn();
      }, 30000);
      dispatch(setLuggageUsed(false));
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

        if (!ClassicEngine.instance.canPutMoreAfterMove(pickedCards[0], count)) {
          onFinishTurn();
        }
      })
      .catch(() => {
        message.error("Unexpected error");
      });
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
    pickPlayCountItems,
  };

  if (reward >= 0) {
    return <div className={classes}>
      <FinishedGameAction reward={reward} playerState={playerState} />
    </div>
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController gameId={gameId} luggageTime={luggageTime} />
      </div>
      <div className="actionBar__action">
        <ActionBarAction {...actionBarProps} />
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};

export default GameActionBar;
