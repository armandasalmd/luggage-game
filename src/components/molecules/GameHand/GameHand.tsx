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
      <GameHandCardStack cards={[randomCard(), randomCard()]} rotate={-5} />
      <GameHandCard card={randomCard()} rotate={-2} />
      <GameHandCard card={randomCard()} rotate={2} />
      <GameHandCard card={randomCard()} rotate={5} />
    </div>
  );
};

export default GameHand;
