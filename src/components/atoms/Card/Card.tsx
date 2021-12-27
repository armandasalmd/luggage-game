import { FC } from "react";
import classNames from "classnames";
import "./Card.scss";

type CardType = "error" | "information" | "success" | "warning";

interface CardProps {
  hoverable?: boolean;
  padded?: boolean;
  halfWidth?: boolean;
  style?: object;
  type?: CardType;
  wrap?: boolean;
  title?: string;
  titleBig?: boolean;
  noContentPaddingX?: boolean;
  noContentPaddingY?: boolean;
  smallHeaderY?: boolean;
  noShadow?: boolean;
  className?: string;
  headerActions?: React.ReactElement | React.ReactHTMLElement<any>;
}

const Card: FC<CardProps> = (props) => {
  const classes = classNames(
    "card",
    {
      [`card--${props.type}`]: props.type,
      "card--titleBig": props.titleBig,
      "card--hoverable": props.hoverable,
      "card--padded": props.padded,
      "card--halfWidth": props.halfWidth,
      "card--wrap": props.wrap,
      "card--noContentPaddingX": props.noContentPaddingX,
      "card--noContentPaddingY": props.noContentPaddingY,
      "card--noShadow": props.noShadow,
      "card--smallHeaderY": props.smallHeaderY
    },
    props.className
  );

  return (
    <div className={classes} style={props.style}>
      {props.title && (
        <div className="card__header">
          <h1 className="card__title">{props.title}</h1>
          {props.headerActions && (
            <div className="card__actions">{props.headerActions}</div>
          )}
        </div>
      )}
      <div className="card__content">{props.children}</div>
    </div>
  );
};

export default Card;
