import Card from "../Card";
import { CardKind } from "../Enums";
import { ILuggage } from "../interfaces/ILuggage";

const CARD_KINDS = ["C", "D", "H", "S"];
const CARD_VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

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

// TODO: remove if unused
export function getFullDeckSet(): Set<string> {
  const deck = new Set<string>();

  for (const value of CARD_VALUES) {
    for (const kind of CARD_KINDS) {
      deck.add(new Card(kind as CardKind, value).toString());
    }
  }

  return deck;
}

export function sortCards(cards: Card[]): Card[] {
  return cards.sort((a, b) => {
    if (a.value === b.value) {
      return CARD_KINDS.indexOf(a.kind) > CARD_KINDS.indexOf(b.kind) ? 1 : -1;
    }

    return CARD_VALUES.indexOf(a.value) > CARD_VALUES.indexOf(b.value) ? 1 : -1;
  });
}

export function toLuggageModel(luggageCards: string): ILuggage {
  const luggage: ILuggage = {
    cardsDown: [],
    cardsUp: [],
  };

  if (luggageCards) {
    luggage.cardsDown = luggageCards
      .split(",")
      .slice(0, 3)
      .map((o) => Card.fromString(o));
    luggage.cardsDown = luggageCards
      .split(",")
      .slice(3, 3)
      .map((o) => Card.fromString(o));
  }

  return luggage;
}

export function randomCard(): Card {
  return new Card(
    CARD_KINDS[Math.floor(Math.random() * CARD_KINDS.length)] as CardKind,
    CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)]
  );
}
