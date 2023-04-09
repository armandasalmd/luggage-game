export interface IReducedDeck {
  [key: string]: {
    column: number;
    kinds: string;
  };
}