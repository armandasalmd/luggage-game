import { FC } from "react";
import { createRipples } from "react-ripples";

import "./ActionButton.scss";

interface ActionButtonProps {
  icon?: any;
  text?: string;
  onClick?(): void;
  onDown?(): void;
  onUp?(): void;
}

const Ripple = createRipples({
  during: 400,
  color: "rgba(0, 0, 0, .1)"
});

export const ActionButton: FC<ActionButtonProps> = (props) => {
  return <Ripple className="actionButton" onClick={props.onClick}>
    <div onMouseDown={props.onDown} onMouseUp={props.onUp} onTouchStart={props.onDown} onTouchEnd={props.onUp}>
      {props.icon && props.icon}
      {props.text && <p className="actionButton__text">{props.text}</p>}
    </div>
  </Ripple>
};