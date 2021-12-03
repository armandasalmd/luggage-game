import { ACard } from "./Card";

export const enum PlayerState {
  InLobby,
  Ready,
  WaitingItsTurn,
  Playing,
  Finished,
  LeftLobby
};

export interface ILuggage {
  downOne?: ACard;
  downTwo?: ACard;
  downThree?: ACard;
  upOne?: ACard;
  upTwo?: ACard;
  upThree?: ACard;
}

export function createLuggage(upFaceCards: ACard[], downFaceCards: ACard[]): ILuggage {
  return {
    downOne: downFaceCards[0],
    downTwo: downFaceCards[1],
    downThree: downFaceCards[2],
    upOne: upFaceCards[0],
    upTwo: upFaceCards[1],
    upThree: upFaceCards[2]
  }
}