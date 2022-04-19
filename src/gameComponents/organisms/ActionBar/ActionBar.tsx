import { FC } from "react";
import classNames from "classnames";

import { MyLuggage } from "../../molecules";
import "./ActionBar.scss";

export const ActionBar: FC = () => {
  const active = true;
  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <MyLuggage />
      </div>
      <div className="actionBar__action">
        <p>ActionBarAction</p>
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};
