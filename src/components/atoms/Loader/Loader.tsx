import { FC } from "react";
import classNames from "classnames";

import "./Loader.scss";
import { ColorType } from "@utils/Types";

interface LoaderProps {
  color?: ColorType;
  text?: string;
}

const Loader: FC<LoaderProps> = (props) => {
  const classes = classNames("loader", {
    "loader--secondary": props.color === "secondary"
  });

  return (
    <div className={classes}>
      <div className="loader__wrapper">
        <div className="loader__inner one"></div>
        <div className="loader__inner two"></div>
        <div className="loader__inner three"></div>
      </div>
      <p className="loader__text">{props.text || "Loading..."}</p>
    </div>
  );
};

export default Loader;
