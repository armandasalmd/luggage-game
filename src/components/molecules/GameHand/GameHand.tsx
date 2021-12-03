import { FC } from "react";
import classNames from "classnames";
import "./GameHand.scss";
import { ACard, randomCard } from "@utils/game/Card";
import { GameCard } from "@components/atoms";

interface GameHandProps {
  cards: ACard[];
}

const GameHand: FC<GameHandProps> = (props) => {
  const classes = classNames("gameHand", {
    "gameHand--dense": props.cards.length > 8
  });

  return (
    <div className={classes}>
      <div className="gameHand__cardStack">
        <GameCard className="gameHand__card" card={randomCard()} />
        <GameCard className="gameHand__card" card={randomCard()} />
        <GameCard className="gameHand__card" card={randomCard()} />
      </div>
      <GameCard className="gameHand__card" card={randomCard()} />
      <GameCard className="gameHand__card" card={randomCard()} />
      <GameCard className="gameHand__card" card={randomCard()} />
    </div>
  );
};

export default GameHand;
