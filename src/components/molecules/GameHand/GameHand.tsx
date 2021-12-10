import { FC } from "react";
import classNames from "classnames";

import "./GameHand.scss";
import { ACard, getRotationAngles } from "@utils/game/Card";
import { toSortedHandCardsModel } from "@utils/game/Game";
import GameHandCard from "./GameHandCard";
import GameHandCardStack from "./GameHandCardStack";

interface GameHandProps {
  cards: ACard[];
}

const GameHand: FC<GameHandProps> = (props) => {
  const classes = classNames("gameHand", {
    "gameHand--dense": props.cards.length > 8,
  });

  const model = toSortedHandCardsModel(props.cards);

  if (!model) {
    return null;
  }

  const rotationAngles = getRotationAngles(model.items.length);
  const items = model.items.map(function (item, index) {
    if (Array.isArray(item)) {
      return (
        <GameHandCardStack
          key={index}
          rotate={rotationAngles[index]}
          cards={item}
        />
      );
    } else {
      return (
        <GameHandCard key={index} rotate={rotationAngles[index]} card={item} />
      );
    }
  });

  return <div className={classes}>{items}</div>;
};

export default GameHand;
