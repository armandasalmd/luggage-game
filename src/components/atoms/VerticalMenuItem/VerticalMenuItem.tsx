import { FC } from "react";
import { createRipples } from "react-ripples";
import classNames from "classnames";
import { ColorType } from "@utils/Types";
import { primaryColor, secondaryColor } from "@utils/Colors";
import "./VerticalMenuItem.scss";

interface VerticalMenuItemProps {
  selected?: boolean;
  colorType?: ColorType;
  text: string;
  id: string | number;
  onClick?(id: string | number): void;
}

const VerticalMenuItem: FC<VerticalMenuItemProps> = (props) => {
  const classes = classNames("verticalMenuItem", {
    "verticalMenuItem--secondary": props.colorType === "secondary",
    "verticalMenuItem--selected": props.selected
  });

  const color = props.colorType == null || props.colorType === "primary" ?
    primaryColor + "30" : secondaryColor + "30";

  let Ripple = createRipples({
    className: "fullWidth noSelect",
    during: 600,
    color: color
  });
  
  return (
    <Ripple>
      <div className={classes} onClick={() => {
        if (typeof props.onClick === "function") {
          props.onClick(props.id);
        } 
      }}>
        {props.text}
      </div>
    </Ripple>
  );
};

export default VerticalMenuItem;