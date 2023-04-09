import { PlayerState } from "@engine/Enums";
import { IGameDetails, IPublicPlayerState, IMyPlayerState } from "@engine/interfaces/IReduxGameState";

export type { IGameDetails, IPublicPlayerState, IMyPlayerState };

export interface ISuccessResult {
  success: boolean;
  message?: string;
}

export interface FinishTurnResponse extends ISuccessResult {
  myPlayerState: IMyPlayerState;
}

export interface GetGameStateResponse {
  gameDetails: IGameDetails;
  myState: IMyPlayerState;
  playersState: IPublicPlayerState[];
}

export interface SubscribeResponse extends ISuccessResult {
  gameState: GetGameStateResponse;
  success: boolean;
}

export interface IServerEmoji {
  sender: string;
  emojiId: string;
}

export interface IPlayerReward {
  playerState: PlayerState;
  reward: number;
  username: string;
}

export interface IGameRewards {
  winners: IPlayerReward[];
  looser: IPlayerReward;
  gameId: string;
}

export interface IPlayerPushedCards {
  cards: string[];
  seatId: number;
}

export interface TakeLuggageResult {
  newLuggage: string;
  seatId: number;
}

export interface PlayCardsResponse extends ISuccessResult {
  myPlayerState?: IMyPlayerState;
}
