import Card from "../Card";
import { CardKind } from "../Enums";
import { ILuggage } from "../interfaces/ILuggage";
import { BaseEngine } from "@engine/engine/BaseEngine";

const CARD_KINDS = ["C", "D", "H", "S"];
const CARD_VALUES = BaseEngine.availableCards;

export function fetchAndCacheCards() {
  for (const value of CARD_VALUES) {
    for (const kind of CARD_KINDS) {
      _load(new Card(kind as CardKind, value).cardPath);
    }
  }

  function _load(src: string) {
    const image = new Image();
    image.src = src;

    return image.complete; // returns isCached
  }
}

export function sortCards(cards: Card[]): Card[] {
  return cards.sort((a, b) => {
    if (a.value === b.value) {
      return CARD_KINDS.indexOf(a.kind) > CARD_KINDS.indexOf(b.kind) ? 1 : -1;
    }

    return CARD_VALUES.indexOf(a.value) > CARD_VALUES.indexOf(b.value) ? 1 : -1;
  });
}

export function sortStringCards(cards: string[]): string[] {
  return sortCards(convertCards(cards)).map((o) => o.toString());
}

export function toLuggageModel(luggageCards: string): ILuggage {
  const luggage: ILuggage = {
    cardsDown: [],
    cardsUp: [],
  };

  if (luggageCards) {
    const cards = luggageCards.split(",");
    luggage.cardsDown = cards.slice(0, 3).map((o) => Card.fromString(o));
    luggage.cardsUp = cards.slice(3).map((o) => Card.fromString(o));
  }

  return luggage;
}

export function convertCards(cards: string[]): Card[] {
  if (Array.isArray(cards)) {
    return cards.map((o) => Card.fromString(o));
  }

  return [];
}
