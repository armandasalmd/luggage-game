import { FC } from "react";
import classNames from "classnames";
import "./GamePile.scss";
import { GameCard } from "@components/atoms";
import { ACard, CardFace, CardKind } from "@utils/game/Card";

interface GamePileProps {
  cardsLeft: number;
  visibleCard?: ACard;
}

const GamePile: FC<GamePileProps> = (props) => {
  const classesLeft = classNames("gamePile__left", {
    "gamePile__left--hidden": props.cardsLeft <= 0,
  });

  const classesRight = classNames("gamePile__right", {
    "gamePile__right--empty": !props.visibleCard,
  });

  const cardDown: ACard = {
    kind: CardKind.Clubs,
    value: "2",
    face: CardFace.DownFace,
  };

  return (
    <div className="gamePile">
      <div className={classesLeft}>
        <GameCard card={cardDown} />
        <p className="gamePile__label">5 cards left</p>
      </div>
      <div className={classesRight}>
        {props.visibleCard && <GameCard card={props.visibleCard} />}
        {!props.visibleCard && <p>Stack empty</p>}
      </div>
    </div>
  );
};

export default GamePile;
