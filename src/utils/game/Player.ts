import { ACard, stringToCard } from "./Card";

export enum PlayerState {
  InLobby,
  Ready,
  WaitingItsTurn,
  Playing,
  Finished,
  LeftLobby,
}

export interface ILuggage {
  downOne?: ACard;
  downTwo?: ACard;
  downThree?: ACard;
  upOne?: ACard;
  upTwo?: ACard;
  upThree?: ACard;
}

export function createLuggage(
  upFaceCards: ACard[],
  downFaceCards: ACard[]
): ILuggage {
  return {
    downOne: downFaceCards[0],
    downTwo: downFaceCards[1],
    downThree: downFaceCards[2],
    upOne: upFaceCards[0],
    upTwo: upFaceCards[1],
    upThree: upFaceCards[2],
  };
}

export function toLuggageModel(luggageCards: string): ILuggage | undefined {
  if (!luggageCards) {
    return undefined;
  }

  const cards = luggageCards.split(",").map(stringToCard);

  return {
    downOne: cards[0],
    downTwo: cards[1],
    downThree: cards[2],
    upOne: cards[3],
    upTwo: cards[4],
    upThree: cards[5],
  };
}
