import { FC } from "react";
import classNames from "classnames";
import "./Button.scss";

type ButtonType = "accent" | "minimal" | "danger" | "disabled" | "link";

interface ButtonProps {
  type?: ButtonType;
}

const Button: FC<ButtonProps> = (props) => {
  const classes = classNames("button", {
    [`button--${props.type}`]: props.type
  });

  return <div className={classes}>{props.children}</div>;
}

export default Button;
