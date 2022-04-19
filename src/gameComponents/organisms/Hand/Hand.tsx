import { FC, useState } from "react";
import classNames from "classnames";

import { Card, sortCards, getFullDeckSet } from "@engine/index";
import { MyDeck } from "..";
import GlobalUtils from "@utils/Global";

interface HandProps {
  className?: string;
  postDrop?: (cards: Card[]) => void;
}

// TODO: remove this
const deckSet = getFullDeckSet();
deckSet.delete("2C");
deckSet.delete("3C");
deckSet.delete("10C");

// Select random value from deckSet
// const getRandomCard = () => {
//   const randomIndex = Math.floor(Math.random() * deckSet.size);
//   const card = Array.from(deckSet.values())[randomIndex];
//   deckSet.delete(card);

//   return card;
// };
let topCards: Card[] = []; // TODO: remove this

function _cloneAndPrepareElement(cardElement: HTMLElement): HTMLElement {
  const cloned: HTMLElement = cardElement.cloneNode(true) as HTMLElement;
  const inner: HTMLElement = cloned.childNodes[0] as HTMLElement;
  inner.style.transform = inner.style.transform.replace(/scale\(.*\)/, "");
  
  const cardBack = document.createElement("div") as HTMLElement;
  cardBack.classList.add("animatedCard__back");
  cardBack.style.backgroundImage = "url(/assets/default_back.svg)";
  cloned.appendChild(cardBack);
  
  return cloned;
}

export const Hand: FC<HandProps> = (props) => {
  const classes = classNames("hand", props.className);
  const [cards, setCards] = useState<Card[]>([
    Card.fromString("2C"),
    Card.fromString("3C"),
    Card.fromString("4C"),
    Card.fromString("5C"),
    Card.fromString("6C"),
    Card.fromString("7C"),
    Card.fromString("8C"),
    Card.fromString("10C"),
  ]);

  function onDrop(cardsDropped: Card[]): boolean {
    const targetElem = document.querySelector(".playground__targetDropzone")!;
    if (targetElem) {
      cardsDropped.forEach(_cardDrop);

      const ids = cardsDropped.map((c) => c.id);
      const sorted = sortCards([...cards.filter((c) => !ids.includes(c.id))]);
      setCards(sorted);
      topCards.push(...cardsDropped); // TODO: remove this
      GlobalUtils.callIfFunction(props.postDrop, cardsDropped); // post drop callback

      return true;
    }

    return false;

    function _cardDrop(card: Card) {
      targetElem.appendChild(_cloneAndPrepareElement(document.getElementById(card.id)!));
    }
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
    <button onClick={takeHome}>Click</button>
  </div>;
};