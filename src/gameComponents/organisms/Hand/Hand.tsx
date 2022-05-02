import { FC, useState } from "react";
import classNames from "classnames";

import { Card, sortCards, moveCardElementsToPile } from "@engine/index";
import { MyDeck } from "..";
import GlobalUtils from "@utils/Global";

interface HandProps {
  className?: string;
  postDrop?: (cards: Card[]) => void;
}

let topCards: Card[] = []; // TODO: remove this

export const Hand: FC<HandProps> = (props) => {
  const classes = classNames("hand", props.className);
  const [cards, setCards] = useState<Card[]>(sortCards([
    Card.fromString("2C"),
    Card.fromString("3C"),
    Card.fromString("4C"),
    Card.fromString("5C"),
    Card.fromString("6C"),
    Card.fromString("4H"),
    Card.fromString("6S"),
    Card.fromString("6H"),
    Card.fromString("7H"),
    Card.fromString("8H"),
    Card.fromString("10C"),
  ]));

  function onDrop(cardsDropped: Card[]): boolean {
    if (moveCardElementsToPile(cardsDropped)) {
      const ids = cardsDropped.map((c) => c.id);
      const sorted = sortCards([...cards.filter((c) => !ids.includes(c.id))]);
      setCards(sorted);
      topCards.push(...cardsDropped); // TODO: remove this
      GlobalUtils.callIfFunction(props.postDrop, cardsDropped); // post drop callback
      topCards = []; // TODO: remove this

      return true;
    }

    return false;
  }

  function canDropFn(card: Card, animatingCards: Card[] = []): boolean {
    const v = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const stack = [...topCards, ...animatingCards];

    if (stack.length === 0) {
      return true;
    }

    return v.indexOf(card.value) >= v.indexOf(stack[stack.length - 1].value);
  }

  function takeHome() {
    const elements = Array.from(document.querySelectorAll(".playground__targetDropzone > .animatedCard"));
    const cardsToHome = elements.map(o => Card.fromId(o.id));
    const sorted = sortCards([...cards, ...cardsToHome]);
    setCards(sorted);
    topCards = []; // TODO: remove this
  }

  return <div className={classes}>
    <MyDeck cards={cards} canDropFn={canDropFn} onDrop={onDrop} />
    <button onClick={takeHome}>Take home</button>
  </div>;
};