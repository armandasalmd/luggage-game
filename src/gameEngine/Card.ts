import Constants from "@utils/Constants";
import { CardKind } from "./Enums";

export default class Card {
  public disabled: boolean = false;
  
  constructor(public kind: CardKind, public value: string, public isFaceUp: boolean = true) {}

  public static fromString(card: string, isFaceUp?: boolean): Card {
    const kind = card.length === 3 ? card.substring(2, 4) : card.substring(1, 2);
    const value = card.length === 3 ? card.substring(0, 2) : card.substring(0, 1);
    
    return new Card(kind as CardKind, value, isFaceUp);
  }

  public static fromId(id: string): Card {
    return Card.fromString(id.substring(5));
  }

  public duplicate(): Card {
    return new Card(this.kind, this.value, this.isFaceUp);
  }

  public toString(): string {
    return this.value + this.kind.toString();
  }

  get cardPath(): string {
    const path = this.isFaceUp
      ? "/" + this.toString() + ".png"
      : "/default_back.svg";
    return Constants.servers.assets + path;
  }

  get id(): string {
    return "card-" + this.toString();
  }

  get kindsPath(): string {
    switch (this.kind) {
      case CardKind.Clubs:
        return "/assets/kinds/clubs.svg";
      case CardKind.Diamonds:
        return "/assets/kinds/diamonds.svg";
      case CardKind.Hearts:
        return "/assets/kinds/hearts.svg";
      case CardKind.Spades:
      default:
        return "/assets/kinds/spades.svg";
    }
  }
}
