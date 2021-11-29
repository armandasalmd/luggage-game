import { FC } from "react";
import classNames from "classnames";
import "./Button.scss";

type ButtonType =
  | "accent"
  | "minimal"
  | "danger"
  | "disabled"
  | "link"
  | "ghost";

interface ButtonProps {
  icon?: any;
  type?: ButtonType;
  centerText?: boolean;
  tall?: boolean;
  style?: object;
}

const Button: FC<ButtonProps> = (props) => {
  const classes = classNames("button", {
    [`button--${props.type}`]: props.type,
    "button--centerText": props.centerText,
    "button--tall": props.tall
  });

  return (
    <div className={classes} style={props.style}>
      {props.icon}
      <p>{props.children}</p>
    </div>
  );
};

export default Button;
