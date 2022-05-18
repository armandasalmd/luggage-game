import Card from "./Card";
import { IReducedDeck } from "./interfaces";

interface ICardPosition {
  row: number;
  column: number;
}

export default class ReducedDeck {
  public reducedDeck: IReducedDeck = {};

  constructor(deck: Card[]) {
    this.update(deck);
  }

  public update(deck: Card[]) {
    let column = 0;

    this.reducedDeck = deck.reduce<IReducedDeck>((acc, card) => {
      if (acc.hasOwnProperty(card.value)) {
        acc[card.value].kinds += card.kind; 
      } else {
        acc[card.value] = {
          column: column++,
          kinds: card.kind,
        }; 
      }
      return acc;
    }, {});
  }

  public getCardPosition(card: Card): ICardPosition {
    return {
      row: this.reducedDeck[card.value]?.kinds.indexOf(card.kind) ?? 0,
      column: this.reducedDeck[card.value]?.column ?? 0,
    };
  }

  public get length(): number {
    return Object.keys(this.reducedDeck).length;
  }
}
