import { FC, useRef } from "react";
import { useDrag } from "react-use-gesture";
import { ControllerUpdate } from "react-spring";
import {
  Card,
  cardInitRot,
  CONSTANTS,
  ISpringTransform,
  useDynamicSprings,
} from "@engine/index";
import { AnimatedCard } from "../../atoms";
import GlobalUtils from "@utils/Global";

interface MyDeckProps {
  cards: Card[];
  canDropFn(card: Card, animatingCards?: Card[]): boolean;
  onDrop(cardsDropped: Card[]): boolean;
}

export const MyDeck: FC<MyDeckProps> = (props) => {
  const animatingCards = useRef<Card[]>([]);
  const { cards, canDropFn, onDrop } = props;
  const { api, springIndexes, resetHandPosition } = useDynamicSprings(cards);

  const bind = useDrag((o) => {
    const card: Card = o.args[0];

    if (o.first || o.last) {
      document.getElementById(card.id)!.style.zIndex = o.first ? "1" : "0";
    }

    const isDragUp = o.direction[1] < 0;
    const isDropped =
      !o.down &&
      o.velocity > CONSTANTS.dragThrowVelocity &&
      isDragUp &&
      canDropFn(card, animatingCards.current);
    const dragSpringIndex =
      springIndexes.find((o) => o.card.id === card.id)?.springIndex ?? -1;

    api.start(_calcDragStyle)[0]?.then(() => {
      const ac = animatingCards.current;
      const isLastAnimatingCard =
        ac.length !== 0 && ac[ac.length - 1].id === card.id;

      if (isDropped && isLastAnimatingCard) {
        if (onDrop(ac)) {
          animatingCards.current = [];
        } else {
          resetHandPosition();
        }
      }
    });

    if (isDropped && !animatingCards.current.includes(card)) {
      animatingCards.current.push(card);
      // If the last card is dropped, then no need to animate hand
      if (cards.length > 1) resetHandPosition(25, animatingCards.current);
    }

    function _calcDragStyle(
      i: number
    ): ControllerUpdate<ISpringTransform> | undefined {
      if (i !== dragSpringIndex || animatingCards.current.includes(card)) {
        return;
      }

      const cardInHandIndex = cards.findIndex((c) => c.id === card.id);
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
        y = my - 28;
      }

      const scale = isDropped ? 0.9 : o.down ? 1.1 : 1;
      const throwDir = (cards.length - 1) / 2 > cardInHandIndex ? -1 : 1;
      let rot =
        my / (throwDir * 100) +
        (isDropped
          ? Math.random() * throwDir * CONSTANTS.targetRotationStrength
          : 0);
      if (!isDropped && o.last)
        rot = cardInitRot(cardInHandIndex, cards.length);

      return {
        x: x as any,
        y,
        rot,
        scale,
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
