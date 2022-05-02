import GlobalUtils from "@utils/Global";
import { randRotation } from "./DeckUtils";
import { ISpringTransform } from "../interfaces/ISpringTransform";
import Card from "../Card";

export function destroyFrom() {
  return { x: 0, y: 0, rotateZ: 0 };
}

export function destroyTo(target: Element, finished: Element) {
  const randRot = randRotation() * 3;

  if (GlobalUtils.isSmallScreen()) {
    return {
      x: (window.innerWidth + target.clientWidth) * 0.5,
      rotateZ: randRot,
    };
  } else {
    return {
      x: finished.clientWidth / -2 - 16,
      y: -(target.getBoundingClientRect().top + 0.5 * finished.clientHeight),
      rotateZ: 90 + randRot,
    };
  }
}

export function throwFrom(playerIndex: number): ISpringTransform {
  const playerRect = document
    .querySelector(".player" + playerIndex)!
    .getBoundingClientRect();
  const dropzoneRect = document
    .querySelector(".playground__targetDropzone")!
    .getBoundingClientRect();
  // Exception to desktop variant
  const xOffset =
    playerIndex % 2 === 1 && !GlobalUtils.isSmallScreen()
      ? playerRect.width
      : 0;

  return {
    x: (-dropzoneRect.x + playerRect.x) / 0.9 - playerRect.width / 3 + xOffset,
    y: (-dropzoneRect.y + playerRect.y) / 0.9 - playerRect.height / 4,
    scale: 0.5,
    rot: 10,
  } as ISpringTransform;
}

export function throwTo(): ISpringTransform {
  return {
    x: 0,
    y: 0,
    scale: 1,
    rot: randRotation(),
  };
}

export function toPileCardElement(
  cardElement: HTMLElement
): HTMLElement | null {
  if (!cardElement) return null;
  const cloned: HTMLElement = cardElement.cloneNode(true) as HTMLElement;
  const inner: HTMLElement = cloned.childNodes[0] as HTMLElement;
  inner.style.transform = inner.style.transform.replace(/scale\(.*\)/, "");

  const cardBack = document.createElement("div") as HTMLElement;
  cardBack.classList.add("animatedCard__back");
  cardBack.style.backgroundImage = "url(/assets/default_back.svg)";
  cloned.appendChild(cardBack);

  return cloned;
}

export function moveCardElementsToPile(cards: Card[]): boolean {
  const targetElem = document.querySelector(".playground__targetDropzone");

  if (targetElem) {
    cards.forEach((o) => {
      const t = toPileCardElement(document.getElementById(o.id)!);
      if (t) targetElem.appendChild(t);
    });

    return true;
  }

  return false;
}
