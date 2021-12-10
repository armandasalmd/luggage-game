import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import "./GameActionBar.scss";
import { RootState } from "@redux/store";
import { LuggageController } from "..";
import { message } from "@components/atoms";
import PickCountAction from "./PickCountAction";

const GameActionBar: FC = () => {
  const { activeSeatId } = useSelector(
    (state: RootState) => state.game.gameDetails
  );
  const { seatId } = useSelector((state: RootState) => state.game.myState);
  const active = activeSeatId === seatId;

  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  useEffect(() => {
    let timeout: any;

    if (active === true) {
      timeout = setTimeout(() => {
        message.information("Your turn finished");
      }, 30000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [active]);

  function onPickCount(count: number) {
    message.information(count.toString());
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        <PickCountAction pickOptions={[1, 3]} onSelect={onPickCount} />
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};

export default GameActionBar;
