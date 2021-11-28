import { FC } from "react";
import classNames from "classnames";
import "./Card.scss";

type CardType = "error" | "information" | "success" | "warning";

interface CardProps {
  hoverable?: boolean;
  padded?: boolean;
  style?: object;
  type?: CardType;
  wrap?: boolean;
}

const Card: FC<CardProps> = (props) => {
  const classes = classNames("card", {
    [`card--${props.type}`]: props.type,
    "card--hoverable": props.hoverable,
    "card--padded": props.padded,
    "card--wrap": props.wrap
  });

  return <div className={classes} style={props.style}>
    {props.children}
  </div>;
}

export default Card;
