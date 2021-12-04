import { FC } from "react";
import classNames from "classnames";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import { ACard } from "@utils/game/Card";
import { GameCard } from "@components/atoms";

interface GameHandCardStackProps {
  cards: ACard[];
}

const GameHandCardStack: FC<GameHandCardStackProps> = (props) => {
  const cardValue = props.cards[0].value;

  function canDrag(monitor: DragSourceMonitor<DropPayload>): boolean {
    // TODO: check if card on the table is lower then the one being dragged
    console.log("Can drag", cardValue);
    return true;
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    canDrag: canDrag,
    type: ItemTypes.Card,
    item: { cardId: cardValue },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const classes = classNames("gameHand__cardStack", {
    "gameHand__cardStack--dragging": isDragging
  });

  return (
    <div className={classes} >
      <div ref={drag} className="gameCard gameCard--medium gameCard--mobileMedium">
        {props.cards.map(function (card, index) {
          return <GameCard key={index} className="gameHand__card" card={card} />
        })}
      </div>
    </div>
  );
};

export default GameHandCardStack;