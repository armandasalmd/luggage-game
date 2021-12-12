import { FC } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { GameCard } from "@components/atoms";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import { ACard } from "@utils/game/Card";
import ClassicEngine from "@utils/game/ClassicEngine";
import { RootState } from "@redux/store";

interface GameHandCardStackProps {
  cards: ACard[];
  rotate?: number;
}

const GameHandCardStack: FC<GameHandCardStackProps> = (props) => {
  const { topPlayCard } = useSelector((state: RootState) => state.game.gameDetails);
  const cardValue = props.cards[0].value;

  function canDrag(monitor: DragSourceMonitor<DropPayload>): boolean {
    // TODO: outdate state is being picked bypassing validation
    // TODO: for some reason I can put 8 on 9
    return ClassicEngine.instance.canPlayCard(cardValue + "H", topPlayCard);
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    canDrag: canDrag,
    type: ItemTypes.Card,
    item: { cardId: cardValue, isStack: true },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const classes = classNames("gameHand__cardStack", {
    "gameHand__cardStack--dragging": isDragging
  });

  const rotate = props.rotate ? `rotate(${props.rotate}deg)` : undefined;

  return (
    <div className={classes} style={{transform: rotate}}>
      <div ref={drag} className="gameCard gameCard--medium gameCard--mobileMedium">
        {props.cards.map(function (card, index) {
          return <GameCard key={index} className="gameHand__card" card={card} />
        })}
      </div>
    </div>
  );
};

export default GameHandCardStack;