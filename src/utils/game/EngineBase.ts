import IGameState from "./IGameState";

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
}
