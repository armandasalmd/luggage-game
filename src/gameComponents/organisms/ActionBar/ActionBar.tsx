import { FC, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "./ActionBar.scss";

import { MyLuggage, EmojiPopup } from "../../molecules";
import EmojiIcon from "../../molecules/MyLuggage/EmojiIcon";
import { ActionButton } from "../../atoms";
import { EmojiSvg } from "../../emojis";
import { sendEmojiAsync } from "@socket/game";
import { RootState } from "@redux/store";
import { luggageTime } from "@engine/index";

interface ActionBarProps {
  onSubmitTurn(): void;
}

export const ActionBar: FC<ActionBarProps> = (props) => {
  const { isActive, isTakeHome, isLuggageTime } = useSelector((state: RootState) => ({
    isActive: state.game.myState.seatId === state.game.gameDetails.activeSeatId,
    isTakeHome:
      state.game.myState.submitQueue.length === 0 &&
      state.game.gameDetails.playDeck.length > 0,
    isLuggageTime: luggageTime(state.game),
  }));
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);
  const [animMyEmoji, setAnimMyEmoji] = useState("");
  const classes = classNames("actionBar", {
    "actionBar--active": isActive,
  });

  function onEmojiActionClick() {
    if (!animMyEmoji) {
      setShowEmojiPopup(!showEmojiPopup);
    }
  }

  function onEmoji(emojiId: string) {
    if (typeof emojiId === "string") sendEmojiAsync(emojiId);
    setShowEmojiPopup(false);
    setAnimMyEmoji(emojiId);
  }

  return (
    <div className={classes}>
      <div className="actionBar__luggage">
        <ActionButton icon={<EmojiIcon />} onClick={onEmojiActionClick}>
          {animMyEmoji && (
            <div style={{ position: "absolute", top: 4 }}>
              <EmojiSvg
                name={animMyEmoji}
                animating
                onAnimationEnd={() => setAnimMyEmoji("")}
              />
            </div>
          )}
        </ActionButton>
        <div className="actionBar__separator" />
        <MyLuggage onOpenning={() => setShowEmojiPopup(false)} />
      </div>
      <div className="actionBar__overlay"></div>
      <div className="actionBar__action">
        {(isActive && !isLuggageTime) && (
          <ActionButton
            freeWidth
            text={isTakeHome ? "Take home" : "Finish turn"}
            onClick={props.onSubmitTurn}
          />
        )}
        {isLuggageTime && <p>Pick a card...</p>}
        {!isActive && <p>Please wait...</p>}
      </div>
      <EmojiPopup
        visible={showEmojiPopup}
        onClose={onEmojiActionClick}
        onEmojiSelected={onEmoji}
      />
    </div>
  );
};
