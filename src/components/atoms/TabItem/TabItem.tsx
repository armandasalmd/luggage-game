import { FC } from "react";
import classNames from "classnames";
import { createRipples } from "react-ripples";
import "./TabItem.scss";
import { ID } from "@utils/Types";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .2)",
  className: "fullWidth fullHeight"
});

export interface TabItemProps {
  active?: boolean;
  text: string;
  id: ID;
  onClick?(id: ID): void;
}

const TabItem: FC<TabItemProps> = (props) => {
  const classes = classNames("tabItem", {
    "tabItem--active": props.active,
  });

  function onClick() {
    if (props.active === false && typeof props.onClick === "function") {
      props.onClick(props.id);
    }
  }

  return (
    <div className={classes}>
      <Ripple onClick={onClick}>
        <div className="tabItem__text">{props.text}</div>
      </Ripple>
    </div>
  );
};

export default TabItem;
