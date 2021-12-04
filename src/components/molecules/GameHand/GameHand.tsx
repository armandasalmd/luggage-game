import { FC } from "react";
import classNames from "classnames";
import "./GameHand.scss";
import { ACard, randomCard } from "@utils/game/Card";
import GameHandCard from "./GameHandCard";
import GameHandCardStack from "./GameHandCardStack";

interface GameHandProps {
  cards: ACard[];
}

const GameHand: FC<GameHandProps> = (props) => {
  const classes = classNames("gameHand", {
    "gameHand--dense": props.cards.length > 8,
  });

  return (
    <div className={classes}>
      <GameHandCardStack cards={[randomCard(), randomCard()]} />
      <GameHandCard card={randomCard()} />
      <GameHandCard card={randomCard()} />
      <GameHandCard card={randomCard()} />
    </div>
  );
};

export default GameHand;
