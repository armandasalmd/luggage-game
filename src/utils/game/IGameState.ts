export interface IPublicPlayerState {
  username: string;
  seatId: number;
  luggageCards: string;
  playerState: string;
  handCardCount: number;
}

export interface IMyPlayerState {
  seatId: number;
  luggageCards: string;
  handCards: string[];
  playerState: string;
}

export interface IGameDetails {
  deadCardsCount: number;
  sourceCardsCount: number;
  topPlayCard: string;
  activeSeatId: number;
}

// redux: game reducer root schema
export interface IGameState {
  gameDetails: IGameDetails;
  myState: IMyPlayerState;
  playersState: IPublicPlayerState[];
}

export default IGameState;