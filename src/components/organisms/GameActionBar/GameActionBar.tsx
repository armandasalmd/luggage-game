import { FC, useState, useEffect } from "react";
import classNames from "classnames";
import "./GameActionBar.scss";
import { LuggageController } from "..";
import { Button } from "@components/atoms";

const GameActionBar: FC = () => {
  const [active, setActive] = useState(false);

  const classes = classNames("actionBar", {
    "actionBar--active": active
  });

  useEffect(() => {
    if (active === true) {
      setTimeout(() => {
        setActive(!active);
      }, 30000);
    }
  }, [active]);

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        <Button onClick={() => setActive(!active)}>Toggle active</Button>
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};

export default GameActionBar;
