import EngineBase from "./EngineBase";
import IGameState from "./IGameState";
import { stringToCard } from "./Card";

interface IValues {
  [key: string]: number;
}

const VALUE_PAIRS: IValues = {
  "2": 0,
  "3": 3,
  "4": 4,
  "5": 0,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 0,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const powerCards = ["2", "5", "10"];

export default class ClassicEngine extends EngineBase {
  public static instance = new ClassicEngine();

  constructor() {
    super("classic");
  }

  public canPlayCard(card: string, topCard: string): boolean {
    if (!card) return false;
    if (!topCard) return true;

    const acard = stringToCard(card);

    if (powerCards.includes(acard.value)) return true;

    const atopcard = stringToCard(topCard);

    return VALUE_PAIRS[acard.value] >= VALUE_PAIRS[atopcard.value];
  }

  public getPutCount(cardValue: string, gameState: IGameState): number[] {
    const applicableCards = gameState.myState.handCards.filter((handCard) =>
      handCard.startsWith(cardValue)
    );

    const topCard = stringToCard(gameState.gameDetails.topPlayCard);

    let result = [];
    if (!gameState.gameDetails.topPlayCard || topCard.value === "5") {
      for (let i = 1; i <= applicableCards.length; i++) {
        result.push(i);
      }

      return result;
    }

    if (applicableCards.length === 1) return [1];
    if (applicableCards.length === 2) return [1];
    if (applicableCards.length === 3) return [1, 3];
    if (applicableCards.length === 4) return [1, 3, 4];

    return [1];
  }

  public canPutMoreAfterMove(moveCard: string, count: number): boolean {
    return count === 3 || stringToCard(moveCard).value === "5";
  }
}
