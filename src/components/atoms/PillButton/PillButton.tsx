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
  hideSuffixSmallScreen?: boolean;
  hideOnSmall?: boolean;
  showOnSmall?: boolean;
  textEllipsis?: boolean;
  clickable?: boolean;
}

const PillButton: FC<PillButtonProps> = (props) => {
  const clickable = props.clickable || props.clickable == null
  const classes = classNames("pillButton", {
    "pillButton--secondary": props.colorType === "secondary",
    "pillButton--hideSuffixSmallScreen": props.hideSuffixSmallScreen,
    "pillButton--ellipsis": props.textEllipsis,
    "pillButton--clickable": clickable,
    "pillButton--hideOnSmall": props.hideOnSmall,
    "pillButton--showOnSmall": props.showOnSmall
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

  const main = (
    <span className="pillButton__main" onClick={onClick}>
      {props.prefix}
      {props.children && <p>{props.children}</p>}
    </span>
  );

  const suffix = (
    <span className="pillButton__suffix" onClick={onSuffixClick}>
      {props.suffix}
    </span>
  );

  return (
    <div className={classes}>
      {clickable && <Ripple>{main}</Ripple>}
      {!clickable && main}

      {props.suffix && <span className="pillButton__divider">|</span>}

      {props.suffix && clickable && (
        <Ripple>
          {suffix}
        </Ripple>
      )}
      {props.suffix && !clickable && suffix}
    </div>
  );
};

export default PillButton;
