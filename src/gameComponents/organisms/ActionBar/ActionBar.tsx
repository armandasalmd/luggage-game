import { FC } from "react";
import classNames from "classnames";

import { MyLuggage } from "../../molecules";
import "./ActionBar.scss";
import EmojiIcon from "../../molecules/MyLuggage/EmojiIcon";
import { ActionButton } from "../../atoms";

export const ActionBar: FC = () => {
  const active = true;
  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  function onEmojiActionClick() {
    console.log("EMOJI!");
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <ActionButton icon={<EmojiIcon />} onClick={onEmojiActionClick} />
        <div className="actionBar__separator" />
        <MyLuggage />
      </div>
      <div className="actionBar__action">
        <p>ActionBarAction</p>
      </div>
      {active && <div className="actionBar__overlay"></div>}
    </div>
  );
};
