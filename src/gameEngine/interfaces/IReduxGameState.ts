import { PlayerState, GameRulesType, GameStatus } from "..";

export interface IPublicPlayerState {
  handCardCount: number;
  luggageCards: string;
  seatId: number;
  status: PlayerState; // linked to reward
  username: string;
  animatingEmoji?: string;
  reward?: number;
  didTakeHome?: boolean;
  connected?: boolean;
  clickedPlayAgain?: boolean;
}

export interface IMyPlayerState {
  handCards: string[];
  luggageCards: string;
  seatId: number;
  status: PlayerState;
  submitQueue: string[];
  reward?: number;
}

export interface IGameDetails {
  activeSeatId: number;
  deadCardsCount: number;
  gameId: string;
  playDeck: string[]; // Only in get game state action
  price: number;
  rules: GameRulesType;
  sourceDeckCount: number; 
}

// redux: game reducer root schema
export interface IReduxGameState {
  gameDetails: IGameDetails;
  myState: IMyPlayerState;
  playersState: IPublicPlayerState[];
  status: GameStatus;
}

export default IReduxGameState;