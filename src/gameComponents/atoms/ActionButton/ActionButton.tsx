import { FC } from "react";
import "./ActionButton.scss";

interface ActionButtonProps {
  icon?: any;
  text?: string;
  onClick?(): void;
  onDown?(): void;
  onUp?(): void;
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  return (
    <div
      className="actionButton"
      onClick={props.onClick}
      onMouseDown={props.onDown}
      onMouseUp={props.onUp}
      onTouchStart={props.onDown}
      onTouchEnd={props.onUp}
    >
      <div>
        {props.icon && props.icon}
        {props.text && <p className="actionButton__text">{props.text}</p>}
      </div>
    </div>
  );
};
