import { FC } from "react";
import classNames from "classnames";
import "./GameActionBar.scss";
import { LuggageController } from "..";

const GameActionBar: FC = () => {
  const classes = classNames("actionBar", {
    "actionBar--active": false
  });

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        <p>Action controller component</p>
      </div>
    </div>
  );
};

export default GameActionBar;
