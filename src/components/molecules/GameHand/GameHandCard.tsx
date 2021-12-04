import { FC } from "react";
import classNames from "classnames";
import { ACard, cardToString } from "@utils/game/Card";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import { GameCard } from "@components/atoms";

interface GameHandCardProps {
  card: ACard;
}

const GameHandCard: FC<GameHandCardProps> = (props) => {
  
  function canDrag(monitor: DragSourceMonitor<DropPayload>): boolean {
    // TODO: check if card on the table is lower then the one being dragged
    console.log("Can drag", cardToString(props.card));
    return true;
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    canDrag: canDrag,
    type: ItemTypes.Card,
    item: { cardId: cardToString(props.card) },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const classes = classNames("gameHand__card", {
    "gameHand__card--dragging": isDragging,
  });

  return (
    <div className={classes}>
      <GameCard card={props.card} ref={drag} />
    </div>
  );
};

export default GameHandCard;