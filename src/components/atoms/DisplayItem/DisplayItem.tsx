import { FC } from "react";
import { createRipples } from "react-ripples";
import "./DisplayItem.scss";

interface DisplayItemProps {
  icon: any;
  title: string;
  description: string;
}

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .15)",
  className: "defaultBorderRadius fullWidth",
});

const DisplayItem: FC<DisplayItemProps> = (props) => {
  return (
    <Ripple>
      <div className="displayItem">
        <span className="displayItem__icon">{props.icon}</span>
        <p className="displayItem__title">{props.title}</p>
        <p className="displayItem__description">{props.description}</p>
      </div>
    </Ripple>
  );
};

export default DisplayItem;
