import { FC } from "react";
import classNames from "classnames";

import "./MiniLuggage.scss";
import { Card, ILuggage } from "@engine/index";
import GlobalUtils from "@utils/Global";
import { MiniCard } from "../../atoms";

export interface MiniLuggageProps {
  luggage: ILuggage;
  className?: string | string[];
  onClick?(card: Card): void;
}

export const MiniLuggage: FC<MiniLuggageProps> = (props) => {
  const { luggage, className, onClick } = props;
  const canPlayDown = luggage.cardsUp.every((o) => o.disabled);
  const classes = classNames("miniLuggage", className);

  luggage.cardsDown.forEach((o) => (o.isFaceUp = false));
  luggage.cardsUp.forEach((o) => (o.isFaceUp = true));

  function onClickImpl(card: Card) {
    if (card.isFaceUp || canPlayDown) {
      GlobalUtils.callIfFunction(onClick, card);
    }
  }

  const downElements = luggage.cardsDown.map((o, index) => (
    <MiniCard
      key={index}
      card={o}
      onClick={canPlayDown ? onClickImpl : undefined}
    />
  ));
  const upElements = luggage.cardsUp.map((o, index) => (
    <MiniCard key={index} card={o} />
  ));

  return (
    <div className={classes}>
      <div className="miniLuggage__faceDown">{downElements}</div>
      <div className="miniLuggage__faceUp">{upElements}</div>
    </div>
  );
};
