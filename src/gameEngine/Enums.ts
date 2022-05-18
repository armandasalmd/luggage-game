export enum CardKind {
  Clubs = "C",
  Diamonds = "D",
  Hearts = "H",
  Spades = "S",
}

export enum GameTheme {
  Light = "light",
  DarkBlue = "dark-blue",
  DarkGreen = "dark-green",
}

export enum GameRulesType {
  Classic = "classic",
}

export enum GameStatus {
  Loading,
  Running,
  Ended
}

export enum PlayerState {
  Playing = "playing",
  Surrendered = "surrendered",
  First = "1st",
  Second = "2nd",
  Third = "3rd",
  Forth = "4th",
  Fifth = "5th",
}
