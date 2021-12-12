import { FC } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import "./GamePile.scss";
import { GameCard, message } from "@components/atoms";
import { ACard, CardFace, CardKind } from "@utils/game/Card";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import GlobalUtils from "@utils/Global";
import { stringToCard } from "@utils/game/Card";
import ClassicEngine from "@utils/game/ClassicEngine";
import { setPickCardCountItems } from "@redux/actions";
import store from "@redux/store";
import { playCardAsync } from "@socket/game";

interface GamePileProps {
  cardsLeft: number;
  visibleCard?: string;
}

const GamePile: FC<GamePileProps> = (props) => {
  const dispatch = useDispatch();
  const { gameId }: any = useParams();

  function onDrop(payload: DropPayload) {
    const gameState = store.getState().game;
    const isMyTurn = gameState.gameDetails.activeSeatId === gameState.myState.seatId;

    if (!isMyTurn) {
      return;
    }

    const cardValue = payload.isStack
      ? payload.cardId
      : stringToCard(payload.cardId).value;

    const puts = ClassicEngine.instance.getPutCount(cardValue, gameState);

    if (puts.length < 2) {
      playCardAsync(gameId, [payload.cardId])
        .then((result) => {
          if (!result.success && result.message) {
            message.error(result.message);
          }
        })
        .catch(() => {
          message.error("Unexpected error");
        });
    } else {
      // TODO: finish this part
      console.log("PICK COUNT", puts);
      dispatch(setPickCardCountItems(puts));
    }
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Card,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
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
