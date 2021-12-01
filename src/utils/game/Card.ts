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
