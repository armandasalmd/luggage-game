import { FC, useRef } from "react";
import { useDrag } from "react-use-gesture";
import { ControllerUpdate } from "react-spring";
import {
  Card,
  cardInitRot,
  CONSTANTS,
  ISpringTransform,
  randRotation,
  useDynamicSprings,
} from "@engine/index";
import { AnimatedCard } from "../../atoms";
import GlobalUtils from "@utils/Global";

interface MyDeckProps {
  cards: Card[];
  canDropFn(): boolean;
  onDropAsync(cardsDropped: Card[]): Promise<boolean>;
}

export const MyDeck: FC<MyDeckProps> = (props) => {
  const animatingCards = useRef<Card[]>([]);
  const { cards, canDropFn, onDropAsync } = props;
  const { api, springIndexes, resetHandPosition, reducedDeck } = useDynamicSprings(cards);

  const bind = useDrag((o) => {
    const card: Card = o.args[0];
    const isDragUp = o.direction[1] < 0;
    const isDropped = !o.down && o.velocity > CONSTANTS.dragThrowVelocity && isDragUp && canDropFn();
    const currentRow = springIndexes.find((o) => o.card === card)?.row ?? 0; // Row of the card
    const dragSpringIndexes = springIndexes.filter(o => o.card.value === card.value && (o.row <= currentRow));

    if (o.first || o.last) {
      const value = o.first ? "1" : "0";
      dragSpringIndexes.forEach((s) => {
        document.getElementById(s.card.id)!.style.zIndex = value;
      });
    }

    api.start(_calcDragStyle)[0]?.then(() => {
      const ac = animatingCards.current;
      const isLastAnimatingCard =
        ac.length !== 0 && ac[ac.length - 1].id === card.id;

      if (isDropped && isLastAnimatingCard) {

        onDropAsync(ac).then((success) => {
          animatingCards.current = [];

          if (!success) resetHandPosition();
        });
      }
    });

    if (isDropped && !animatingCards.current.includes(card)) {
      animatingCards.current.push(...dragSpringIndexes.map(o => o.card));
      // If the last card is dropped, then no need to animate hand
      if (cards.length > 1) resetHandPosition(25, animatingCards.current);
    }

    function _calcDragStyle(
      i: number
    ): ControllerUpdate<ISpringTransform> | undefined {
      const current = dragSpringIndexes.find(o => o.springIndex === i);

      if (!current || animatingCards.current.includes(card)) return;

      let x = undefined;
      let y = 0;
      const my = o.movement[1];

      if (isDropped) {
        const coords = document
          .querySelector(".playground__target")!
          .getBoundingClientRect();
        const isSmall = GlobalUtils.isSmallScreen();
        x = isSmall ? 0 : coords.width / 2 + 3;
        y = -(window.innerHeight - coords.y - coords.height) + 24;
      } else if (o.down) {
        y = my - (1 - current.row) * CONSTANTS.stackedSpacing;
      } else {
        y = CONSTANTS.stackedSpacing *  current.row; // Released - back to initial
      }

      const throwDir = (reducedDeck.length - 1) / 2 > current.column ? -1 : 1;
      const rot = isDropped
        ? randRotation()
        : o.last
        ? cardInitRot(current.column, reducedDeck.length)
        : my / (throwDir * 100);

      return {
        x,
        y,
        rot,
        scale: isDropped ? 0.9 : o.down ? 1.1 : 1,
        config: CONSTANTS.config(o.down, isDropped),
      };
    }
  });

  const cardElements = springIndexes.map(function ({ card, styles }) {
    return (
      <AnimatedCard
        key={card.toString()}
        card={card}
        events={bind(card)}
        transform={styles}
      />
    );
  });

  return <>{cardElements}</>;
};
