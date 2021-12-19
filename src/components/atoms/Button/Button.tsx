import { FC } from "react";
import classNames from "classnames";
import { createRipples } from "react-ripples";
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
  className?: string;
  onClick?(): void;
  tightX?: boolean;
  bigText?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const classes = classNames("button", {
    [`button--${props.type}`]: props.type,
    "button--centerText": props.centerText,
    "button--tall": props.tall,
    "button--tightX": props.tightX,
    "button--bigText": props.bigText
  }, props.className);

  const Ripple = createRipples({
    during: 600,
    color: "rgba(0, 0, 0, .15)",
    className: "defaultBorderRadius"
  });

  function onClick() {
    if (typeof props.onClick === "function" && props.type !== "disabled") {
      props.onClick();
    }
  }

  return (
    <Ripple onClick={onClick}>
      <div className={classes} style={props.style}>
        {props.icon}
        <p>{props.children}</p>
      </div>
    </Ripple>
  );
};

export default Button;
