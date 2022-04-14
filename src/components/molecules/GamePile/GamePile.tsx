import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import "./GamePile.scss";
import { GameCard, message } from "@components/atoms";
import { ACard, CardFace, CardKind } from "@utils/game/Card";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import GlobalUtils from "@utils/Global";
import { stringToCard } from "@utils/game/Card";
import ClassicEngine from "@utils/game/ClassicEngine";
import { setPickCardCountItems, clearPickCardCount } from "@redux/actions";
import { RootState } from "@redux/store";
import { finishTurnAsync, playCardAsync } from "@socket/game";
import EngineBase from "@utils/game/EngineBase";

interface GamePileProps {
  cardsLeft: number;
  visibleCard?: string;
}

const GamePile: FC<GamePileProps> = (props) => {
  const dispatch = useDispatch();
  const { gameId }: any = useParams();
  const gameState = useSelector((state: RootState) => state.game);

  const handleDrop = useCallback(onDrop, [dispatch, gameId, gameState]);

  function onDrop(payload: DropPayload) {
    const isMyTurn =
      gameState.gameDetails.activeSeatId === gameState.myState.seatId;

    if (!isMyTurn) {
      return;
    }

    const cardValue = payload.isStack
      ? payload.cardId
      : stringToCard(payload.cardId).value;

    const puts = ClassicEngine.instance.getPutCount(cardValue, gameState);

    if (puts.length < 2) {
      dispatch(clearPickCardCount());
      const card = payload.isStack
        ? EngineBase.getCardsByValue(gameState.myState.handCards, cardValue)[0]
        : payload.cardId;
      playCardAsync(gameId, [card])
        .then((result) => {
          if (!result.success && result.message) {
            message.error(result.message);
          } else if (!ClassicEngine.instance.canPutMoreAfterMove(card, 1)) {
            onFinish();
          }
        })
        .catch(() => {
          message.error("Unexpected error");
        });
    } else {
      dispatch(setPickCardCountItems(puts, cardValue));
    }

    function onFinish() {
      finishTurnAsync(gameId)
        .then((result) => {
          if (!result.success) message.error(result.message);
        })
        .catch(() => {
          message.error("Unexpected error");
        });
    }
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Card,
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [gameState]
  );

  const classesLeft = classNames("gamePile__left", {
    "gamePile__left--hidden": props.cardsLeft <= 0,
  });

  const classesRight = classNames("gamePile__right", {
    "gamePile__right--empty": !props.visibleCard,
    "gamePile__right--active": isOver,
  });

  const cardDown: ACard = {
    kind: CardKind.Clubs,
    value: "2",
    face: CardFace.DownFace,
  };

  const label = `${props.cardsLeft} ${GlobalUtils.pluralize(
    "card",
    props.cardsLeft
  )} left`;
  const card: ACard = stringToCard(props.visibleCard || "2C");

  return (
    <div className="gamePile">
      <div className={classesLeft}>
        <GameCard card={cardDown} />
        <p className="gamePile__label">{label}</p>
      </div>
      <div className={classesRight} id="gamePile__right" ref={drop}>
        {props.visibleCard && <GameCard card={card} />}
        {!props.visibleCard && <p>Stack empty</p>}
      </div>
    </div>
  );
};

export default GamePile;
