import CONSTANTS from "../Constants";
import { ISpringTransform } from "../interfaces";

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

export function to(i: number, total: number): ISpringTransform {
  return {
    y: 0,
    x: cardInitX(i, total),
    scale: 1,
    rot: cardInitRot(i, total)
  };
}

export function from(i: number): ISpringTransform {
  return {
    y: 500,
    x: 0,
    scale: 1.5,
    rot: 0
  };
}

export function trans(r: any, s: any): string {
  return `perspective(600px) rotateY(${r / 5}deg) rotateZ(${r}deg) scale(${s})`;
}

export function parseTranslate(value: string) {
  return value.replaceAll(" ", "").replaceAll("px", "").replaceAll(/translate3d\(|\)/g, "").split(",").map(o => parseFloat(o));
}