import { useEffect, useState } from "react";
import { useSprings, ControllerUpdate } from "react-spring";
import { ISpringTransform } from "../interfaces/ISpringTransform";
import { from, to, parseTranslate } from "@engine/index";
import Card from "../Card";
import ReducedDeck from "../ReducedDeck";

export interface SpringIndex {
  card: Card;
  column: number;
  row: number;
  springIndex: number;
  styles: ISpringTransform;
}

const MAX_SPRINGS = 50;
type UsedSpringState = string | null; // String represents a card id that uses this spring
type MyControllerUpdate = ControllerUpdate<ISpringTransform> | undefined;

export function useDynamicSprings(cards: Card[]) {
  const reducedDeck = new ReducedDeck(cards);
  const [previousCardIds, setPreviousCardIds] = useState<string[]>(cards.map(o => o.id));
  const [usedSprings, setUsedSprings] = useState<UsedSpringState[]>(Array(MAX_SPRINGS).fill(null));
  const [springs, api] = useSprings(MAX_SPRINGS, index => {
    return {
      from: from(index)
    };
  });

  function _allocateSpringsAndAnimate(newCards: Card[]) {
    newCards.map(o => {
      const spring = _getSpringIndex(o);
      const existingElem = document.querySelector(".playground__targetDropzone > #" + o.id) as HTMLElement;

      if (existingElem) {
        try {
          const t = parseTranslate(existingElem.style.transform);
  
          _setImmediate(spring.springIndex, {
            x: t[0],
            y: t[1],
            scale: 1
          })[0].then(() => {
            existingElem.remove();
          });
        } catch (e) {
          console.log(e);
        }
      }
      return null;
    }); // allocate
    resetHandPosition();
  }

  function _allocateUnusedSpring(card: Card): number {
    const index = usedSprings.indexOf(null);
    usedSprings[index] = card.id;
    setUsedSprings([...usedSprings]);

    return index;
  }

  function _createSpringIndex(card: Card): SpringIndex {
    const index = _allocateUnusedSpring(card);
    const pos = reducedDeck.getCardPosition(card);

    return {
      card: card.duplicate(),
      springIndex: index,
      styles: springs[index],
      row: pos.row,
      column: pos.column
    };
  }

  function _getSpringIndex(card: Card): SpringIndex {
    const index = usedSprings.indexOf(card.id);
    
    if (index === -1) {
      return _createSpringIndex(card);
    }

    const pos = reducedDeck.getCardPosition(card);

    return {
      card: card.duplicate(),
      springIndex: index,
      styles: springs[index],
      row: pos.row,
      column: pos.column
    };
  }

  function _initIndexes(): SpringIndex[] {
    return cards.map(_getSpringIndex);
  }

  function _releaseAndResetSpring(springIndex: number): void {
    usedSprings[springIndex] = null;
    setUsedSprings([...usedSprings]);
    _setImmediate(springIndex, from(springIndex));
  }

  function _setImmediate(springIndex: number, to: ISpringTransform) {
    return api.start((index: number): MyControllerUpdate => {
      if (index === springIndex) {
        return {
          to,
          immediate: true
        };
      }
    });
  }

  function resetHandPosition(delay: number = 25, excludeCards: Card[] | null = null) {
    const excludedIds = excludeCards ? excludeCards.map(o => o.id) : [];
    const cards2 = excludeCards === null ? cards : cards.filter(o => !excludedIds.includes(o.id));
    const reducedDeck2 = new ReducedDeck(cards2);

    api.start(_calcInitialStyle);
    
    function _calcInitialStyle(springIndex: number): MyControllerUpdate {
      const isExcluded = excludeCards !== null && excludedIds.includes(usedSprings[springIndex] || "");

      if (usedSprings[springIndex] !== null && !isExcluded) {
        const pos = reducedDeck2.getCardPosition(Card.fromId(usedSprings[springIndex] || ""));

        return {
          to: to(pos.column, pos.row, reducedDeck2.length),
          delay: pos.column * delay
        };
      }
    }
  }

  useEffect(() => {
    // Allocate and animate new cards
    const newCards = cards.filter(o => !previousCardIds.includes(o.id));
    if (newCards.length > 0) _allocateSpringsAndAnimate(newCards);
    // Detach old cards
    const cardsSet = new Set(cards.map(o => o.id));
    const removedCardIds = previousCardIds.filter(o => !cardsSet.has(o));
    removedCardIds.forEach(o => _releaseAndResetSpring(usedSprings.indexOf(o)));
    // Save previous cards state
    setPreviousCardIds(cards.map(o => o.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, useSprings]);
  
  useEffect(() => {
    resetHandPosition(250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { api, springIndexes: _initIndexes(), resetHandPosition, reducedDeck };
}
