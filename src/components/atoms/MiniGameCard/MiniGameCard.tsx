import { FC } from "react";
import classNames from "classnames";
import "./MiniGameCard.scss";
import { ACard, CardFace, kindsPath } from "@utils/game/Card";
import { ColorType } from "@utils/Types";

interface MiniGameCardProps {
  card?: ACard;
  colorType?: ColorType;
  invisible?: boolean;
}

const MiniGameCard: FC<MiniGameCardProps> = (props) => {
  const classes = classNames("miniGameCard", {
    "miniGameCard--secondary": props.colorType === "secondary",
    "miniGameCard--invisible": props.invisible
  });

  const isDisplayed = props.card && props.card.face === CardFace.UpFace;

  return (
    <div className={classes}>
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
