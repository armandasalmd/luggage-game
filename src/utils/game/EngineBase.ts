import IGameState from "./IGameState";
import { stringToCard } from "./Card";

export type GameRules = "classic";

export default abstract class EngineBase {
  public gameRules: GameRules;

  constructor(rules: GameRules) {
    this.gameRules = rules;
  }

  public abstract canPlayCard(card: string, topCard: string): boolean;
  public abstract canPutMoreAfterMove(
    moveCard: string,
    count: number
  ): boolean;
  public abstract getPutCount(card: string, gameState: IGameState): number[];

  public static getCardsByValue(cards: string[], value: string) {
    return cards.filter(item => stringToCard(item).value === value);
  }

  public static pick(cards: string[], count: number) {
    if (cards.length <= count) return [...cards];

    return cards.filter(() => count-- > 0); 
  }

  public static pickCardsByValue(cards: string[], value: string, count: number) {
    cards = this.getCardsByValue(cards, value);

    return this.pick(cards, count);
  }
}
