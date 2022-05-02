import CONSTANTS from "../Constants";
import { ISpringTransform } from "../interfaces";
import Card from "../Card";

export function cardInitRot(i: number, total: number): number {
  const { from, to } = CONSTANTS.handRotation;

  if (!total || total < 2) return 0;
  return ((to - from) / (total - 1)) * i + from;
}

export function cardInitX(i: number, total: number): number {
  const CARD_WIDTH = 125;
  const isOffboundaries = (total: number, spacing: number) => (window.innerWidth - CARD_WIDTH - (total - 1) * spacing) <= 0;
  
  let spacing = CONSTANTS.handSpacing / total * (total > 5 ? 1 : 0.75);

  if (isOffboundaries(total, spacing))
    return (window.innerWidth - CARD_WIDTH) / -2 +  spacing * i + 8;
  else
    return (total / 2) * -spacing + spacing * i + spacing * 0.5;
}

export function cardRowInStack(deck: Card[], card: Card): number {
  let row = 0;
  for (let i = 0; i < deck.length; i++) {
    if (deck[i].value === card.value) {
      if (deck[i].kind === card.kind) {
        break;
      } else {
        row++;
      }
    }
  }
  return row;
}

export function from(i: number): ISpringTransform {
  return {
    y: 500,
    x: 0,
    scale: 1.5,
    rot: 0
  };
}

export function parseTranslate(value: string) {
  return value.replaceAll(" ", "").replaceAll("px", "").replaceAll(/translate3d\(|\)/g, "").split(",").map(o => parseFloat(o));
}

export function randRotation(): number {
  return (Math.random() - 0.5) * CONSTANTS.targetRotationStrength;
}


export function to(column: number, row: number, totalColumns: number): ISpringTransform {
  return {
    x: cardInitX(column, totalColumns),
    y: CONSTANTS.stackedSpacing * row,
    rot: cardInitRot(column, totalColumns),
    scale: 1,
  };
}

export function trans(r: any, s: any): string {
  return `rotateZ(${r}deg) scale(${s})`;
}
