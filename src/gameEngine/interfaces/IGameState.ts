export interface IPublicPlayerState {
  handCardCount: number;
  luggageCards: string;
  playerState: string;
  seatId: number;
  username: string;
}

export interface IMyPlayerState {
  seatId: number;
  luggageCards: string;
  handCards: string[];
  playerState: string;
  lastMoves: string[];
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
  luggageUsed?: boolean;
  reward?: number;
}

export default IGameState;