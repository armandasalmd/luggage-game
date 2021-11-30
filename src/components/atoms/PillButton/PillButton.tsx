import { FC } from "react";
import classNames from "classnames";
import { createRipples } from "react-ripples";
import "./PillButton.scss";
import { ColorType } from "@utils/Types";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .1)",
  className: "defaultBorderRadius fullHeigth",
});

interface PillButtonProps {
  prefix?: any;
  suffix?: any;
  colorType?: ColorType;
  onClick?(): void;
  onSuffixClick?(): void;
}

const PillButton: FC<PillButtonProps> = (props) => {
  const classes = classNames("pillButton", {
    "pillButton--secondary": props.colorType === "secondary",
  });

  function onClick() {
    if (typeof props.onClick === "function") {
      props.onClick();
    }
  }

  function onSuffixClick() {
    if (typeof props.onSuffixClick === "function") {
      props.onSuffixClick();
    }
  }

  return (
    <div className={classes}>
      <Ripple>
        <span className="pillButton__main" onClick={onClick}>
          {props.prefix}
          <p>{props.children}</p>
        </span>
      </Ripple>
      {props.suffix && <span className="pillButton__divider">|</span>}
      {props.suffix && (
        <Ripple>
          <span className="pillButton__suffix" onClick={onSuffixClick}>
            {props.suffix}
          </span>
        </Ripple>
      )}
    </div>
  );
};

export default PillButton;
