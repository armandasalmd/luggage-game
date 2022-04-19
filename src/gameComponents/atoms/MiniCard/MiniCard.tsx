import { FC } from "react";
import classNames from "classnames";

import "./MiniCard.scss";
import { Card } from "@engine/index";
import GlobalUtils from "@utils/Global";

interface MiniCardProps {
  card: Card;
  onClick?(card: Card): void;
}

export const MiniCard: FC<MiniCardProps> = (props) => {
  const classes = classNames("miniCard", {
    "miniCard--click": typeof props.onClick === "function",
    "miniCard--disabled": props.card.disabled,
    "miniCard--faceDown": !props.card.isFaceUp,
  });

  return (
    <div
      className={classes}
      onClick={() => GlobalUtils.callIfFunction(props.onClick, props.card)}
    >
      {props.card.isFaceUp && (
        <img
          className="miniCard__icon"
          alt={props.card.toString()}
          src={props.card.kindsPath}
        />
      )}
      {props.card.isFaceUp && (
        <p className="miniCard__value">{props.card.value}</p>
      )}
    </div>
  );
};
