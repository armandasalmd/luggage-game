import { FC } from "react";
import { animated, to as interpolate } from "react-spring";
import { ReactEventHandlers } from "react-use-gesture/dist/types";
import "./AnimatedCard.scss";

import { Card, ISpringTransform, trans } from "@engine/index";

interface AnimatedCardProps {
  card: Card;
  events?: ReactEventHandlers;
  transform: ISpringTransform;
}

export const AnimatedCard: FC<AnimatedCardProps> = (props) => {
  if (props.card.disabled) return null;

  const { x, y, rot, scale } = props.transform;
  const innerStyle = {
    backgroundImage: `url(${props.card.cardPath})`,
    transform: interpolate([rot, scale], trans),
  };

  return <animated.div
    className="animatedCard"
    id={props.card.id}
    style={{ x, y }}
  >
    <animated.div className="animatedCard__inner" style={innerStyle} {...props.events} />
  </animated.div>;
};
