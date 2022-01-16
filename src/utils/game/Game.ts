import Confetti from "canvas-confetti";
import { ACard, sortCards } from "./Card";

export interface IGameDetails {
  isPrivate: boolean;
  reward: number;
  playerCount: number;
  rules: string;
}

export interface IPlayer {
  avatar?: string;
  username: string;
  ready: boolean;
  seatId: number;
  waving?: boolean;
}

export type HandItem = ACard | ACard[];

export interface IHandCards {
  items: HandItem[];
}

export function fireConfetti() {
  Confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export function toSortedHandCardsModel(cards: ACard[]): IHandCards | undefined {
  if (!cards || cards.length === 0) {
    return undefined;
  }

  const sorted = sortCards(cards);

  const groupedCards = sorted.reduce((acc: any, card) => {
    const x = { ...acc };

    if (x[card.value] === undefined) {
      x[card.value] = card;
    } else if (Array.isArray(x[card.value])) {
      x[card.value].push(card);
    } else if (typeof x[card.value] === "object") {
      x[card.value] = [x[card.value], card];
    }

    return x;
  }, {});

  return { items: Object.values(groupedCards) };
}

export function getGameRulesTitle(rules: string): string {
  if (rules === "classic") return "Classic game mode";

  return "No title";
}