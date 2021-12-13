import { FC } from "react";
import classNames from "classnames";

import store from "@redux/store";
import ClassicEngine from "@utils/game/ClassicEngine";
import { ACard, cardToString } from "@utils/game/Card";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import { GameCard } from "@components/atoms";

interface GameHandCardProps {
  card: ACard;
  rotate?: number;
}

const GameHandCard: FC<GameHandCardProps> = (props) => {
  const stringCard = cardToString(props.card);

  function canDrag(monitor: DragSourceMonitor<DropPayload>): boolean {
    return ClassicEngine.instance.canPlayCard(
      stringCard,
      store.getState().game.gameDetails.topPlayCard
    );
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    canDrag: canDrag,
    type: ItemTypes.Card,
    item: { cardId: stringCard, isStack: false },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [props.card]);

  const classes = classNames("gameHand__card", {
    "gameHand__card--dragging": isDragging,
  });

  const rotate = props.rotate ? `rotate(${props.rotate}deg)` : undefined;

  return (
    <div className={classes} style={{ transform: rotate }}>
      <GameCard card={props.card} ref={drag} />
    </div>
  );
};

export default GameHandCard;
