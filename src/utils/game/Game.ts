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
}