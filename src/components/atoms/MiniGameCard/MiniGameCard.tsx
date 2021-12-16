import { FC } from "react";
import classNames from "classnames";

import "./MiniGameCard.scss";
import { ACard, CardFace, kindsPath } from "@utils/game/Card";
import { ColorType } from "@utils/Types";
import GlobalUtils from "@utils/Global";

interface MiniGameCardProps {
  card?: ACard;
  colorType?: ColorType;
  invisible?: boolean;
  onClick?(card: ACard): void;
}

const MiniGameCard: FC<MiniGameCardProps> = (props) => {
  const classes = classNames("miniGameCard", {
    "miniGameCard--secondary": props.colorType === "secondary",
    "miniGameCard--invisible": props.invisible,
    "miniGameCard--click": typeof props.onClick === "function"
  });

  const isDisplayed = props.card && props.card.face === CardFace.UpFace;

  function onClick() {
    GlobalUtils.callIfFunction(props.onClick, props.card);
  }

  return (
    <div className={classes} onClick={onClick}>
      {props.card && isDisplayed && (
        <img
          className="miniGameCard__icon"
          alt={props.card?.kind.toString()}
          src={kindsPath(props.card.kind)}
        />
      )}
      {props.card && isDisplayed && (
        <p className="miniGameCard__value">{props.card.value}</p>
      )}
    </div>
  );
};

export default MiniGameCard;
