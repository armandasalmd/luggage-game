import { FC, useState } from "react";
import classNames from "classnames";
import "./ActionBar.scss";

import { MyLuggage, EmojiPopup } from "../../molecules";
import EmojiIcon from "../../molecules/MyLuggage/EmojiIcon";
import { ActionButton } from "../../atoms";
import { EmojiSvg } from "../../emojis";

export const ActionBar: FC = () => {
  const active = true;
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);
  const [animMyEmoji, setAnimMyEmoji] = useState("");
  const classes = classNames("actionBar", {
    "actionBar--active": active,
  });

  function onEmojiActionClick() {
    if (!animMyEmoji) {
      setShowEmojiPopup(!showEmojiPopup);
    }
  }

  function onEmoji(name: string) {
    console.log("Emoji", name, "clicked");
    setShowEmojiPopup(false);
    setAnimMyEmoji(name);
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <ActionButton icon={<EmojiIcon />} onClick={onEmojiActionClick}>
          {animMyEmoji && <div style={{position: "absolute", top: 0}}>
            <EmojiSvg name={animMyEmoji} animating onAnimationEnd={() => setAnimMyEmoji("")} />
          </div>}
        </ActionButton>
        <div className="actionBar__separator" />
        <MyLuggage />
      </div>
      <div className="actionBar__action">
        <p>ActionBarAction</p>
      </div>
      {active && <div className="actionBar__overlay"></div>}
      <EmojiPopup
        visible={showEmojiPopup}
        onClose={onEmojiActionClick}
        onEmojiSelected={onEmoji}
      />
    </div>
  );
};
