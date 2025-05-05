import { FC } from "react";
import classNames from "classnames";
import "./ActionButton.scss";

interface ActionButtonProps {
  disabled?: boolean;
  freeWidth?: boolean;
  icon?: any;
  text?: string;
  onClick?(): void;
  onDown?(): void;
  onUp?(): void;
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const classes = classNames("actionButton", {
    "actionButton--freeWidth": props.freeWidth
  });

  return (
    <div
      className={classes}
      onClick={() => {
        if (props.disabled !== true) {
          props.onClick && props.onClick();
        }
      }}
      onMouseDown={props.onDown}
      onMouseUp={props.onUp}
      onTouchStart={props.onDown}
      onTouchEnd={props.onUp}
    >
      <div>
        {props.icon && props.icon}
        {props.text && <p className="actionButton__text">{props.text}</p>}
      </div>
      {props.children}
    </div>
  );
};
