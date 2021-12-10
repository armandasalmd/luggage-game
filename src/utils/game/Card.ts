import Constants from "@utils/Constants";
import GlobalUtils from "@utils/Global";

type NumberObject = {
  [key: string]: number;
};

const CARD_VALUE_PAIRS: NumberObject = {
  "2": 1000,
  "3": 3,
  "4": 4,
  "5": 1000,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 1000,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export enum CardKind {
  Clubs = "C",
  Diamonds = "D",
  Hearts = "H",
  Spades = "S",
}

export enum CardFace {
  UpFace,
  DownFace,
}

export enum CardSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export interface ACard {
  kind: CardKind;
  value: string;
  face?: CardFace;
}

export function cardToString(card: ACard): string {
  return card.value + card.kind.toString();
}

export function stringToCard(card: string): ACard {
  const value = card.length === 3 ? card.substr(0, 2) : card.substr(0, 1);
  const kind = card.length === 3 ? card.substr(2, 1) : card.substr(1, 1);

  return {
    kind: kind as CardKind,
    value,
  };
}

export function cardPath(card: ACard): string {
  if (card.face === CardFace.DownFace) {
    return "/assets/blue_back.png";
  } else {
    return "/assets/" + cardToString(card) + ".png";
  }
}

export function randomCard(): ACard {
  let kind = Object.values(CardKind)[GlobalUtils.randomInt(0, 3)];
  let value =
    Object.keys(CARD_VALUE_PAIRS)[
      GlobalUtils.randomInt(0, Object.keys(CARD_VALUE_PAIRS).length - 1)
    ];

  return {
    kind,
    value,
    face: CardFace.UpFace,
  };
}

export function kindsPath(kind: CardKind): string {
  if (kind === CardKind.Clubs) {
    return "/assets/kinds/clubs.svg";
  } else if (kind === CardKind.Diamonds) {
    return "/assets/kinds/diamonds.svg";
  } else if (kind === CardKind.Hearts) {
    return "/assets/kinds/hearts.svg";
  } else {
    return "/assets/kinds/spades.svg";
  }
}

export function getCardWeight(value: string | ACard): number {
  let realValue = typeof value === "string" ? value : value.value;

  return CARD_VALUE_PAIRS[realValue] || -1;
}

export function sortCards(cards: ACard[]): ACard[] {
  const sortedValues = Object.keys(CARD_VALUE_PAIRS);
  const sortedKinds = ["C", "D", "H", "S"];

  return cards.sort((a, b) => {
    if (a.value === b.value) {
      return sortedKinds.indexOf(a.kind) > sortedKinds.indexOf(b.kind) ? 1 : -1;
    }

    return sortedValues.indexOf(a.value) > sortedValues.indexOf(b.value) ? 1 : -1;
  });
}

export function getRotationAngles(cardCount: number): number[] {
  if (!cardCount || cardCount < 2) {
    return [0];
  }

  const { from, to } = Constants.cardRotation;
  const step = (to - from) / (cardCount - 1);
  const angles = [from];

  for (let i = 1; i < cardCount - 1; i++) {
    const value = angles[i - 1] + step;

    if (value === 0) {
      angles.push(0);
    } else {
      angles.push(Math.round(value * 100) / 100);
    }
  }

  angles.push(to);

  return angles;
}