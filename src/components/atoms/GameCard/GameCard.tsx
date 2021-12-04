import { forwardRef, PropsWithChildren } from "react";
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

const GameCard = forwardRef<HTMLDivElement, PropsWithChildren<GameCardProps>>(
  (props, ref) => {
    const size = props.size == null ? CardSize.Medium : props.size;
    const mobileSize =
      props.mobileSize == null ? CardSize.Medium : props.mobileSize;

    function getSizeClass(size: CardSize, isMobile: boolean): string {
      let sizeClass = isMobile
        ? GlobalUtils.capitalise(size.toString())
        : size.toString();

      return "gameCard--" + (isMobile ? "mobile" : "") + sizeClass;
    }

    const classes = classNames(
      "gameCard",
      [
        getSizeClass(size, false),
        getSizeClass(mobileSize, true),
        props.className,
      ]
    );

    const cardId = cardToString(props.card);

    return (
      <div
        ref={ref}
        className={classes}
        data-card={cardId}
        id={cardId}
      >
        <img
          alt={cardId}
          src={cardPath(props.card)}
          style={{ pointerEvents: "none" }}
        />
      </div>
    );
  }
);

export default GameCard;
