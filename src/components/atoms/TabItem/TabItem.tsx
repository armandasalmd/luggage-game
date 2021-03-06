import { FC } from "react";
import classNames from "classnames";
import { createRipples } from "react-ripples";
import "./TabItem.scss";
import { ID } from "@utils/Types";

const Ripple = createRipples({
  during: 600,
  color: "rgba(30, 136, 229, .2)",
  className: "fullHeight",
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
    <Ripple onClick={onClick}>
      <div className={classes}>
        <div className="tabItem__text">{props.text}</div>
      </div>
    </Ripple>
  );
};

export default TabItem;
