import { FC } from "react";
import classNames from "classnames";
import "./GameCard.scss";

import { ACard, CardSize, cardToString, cardPath } from "@utils/game/Card";
import GlobalUtils from "@utils/Global";

interface GameCardProps {
  card: ACard;
  size?: CardSize;
  mobileSize?: CardSize;
  onClick?(card: ACard): void;
  className?: string | string[];
}

const GameCard: FC<GameCardProps> = (props) => {
  const size = props.size == null ? CardSize.Medium : props.size;
  const mobileSize =
    props.mobileSize == null ? CardSize.Medium : props.mobileSize;

  function getSizeClass(size: CardSize, isMobile: boolean): string {
    let sizeClass = isMobile ? GlobalUtils.capitalise(size.toString()) : size.toString();

    return "gameCard--" + (isMobile ? "mobile" : "") + sizeClass;
  }

  const classes = classNames("gameCard", [
    getSizeClass(size, false),
    getSizeClass(mobileSize, true),
    props.className
  ]);

return <div className={classes}>
    <img alt={cardToString(props.card)} src={cardPath(props.card)} />
  </div>;
};

export default GameCard;
