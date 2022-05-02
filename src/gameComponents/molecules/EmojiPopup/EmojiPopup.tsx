import { FC } from "react";
import classNames from "classnames";
import "./EmojiPopup.scss";

import { EmojiItem } from "../../atoms";
import { emojiConfig } from "../../emojis";
import { Settings } from "@engine/index";
import CloseIcon from "@material-ui/icons/Close";

interface EmojiPopupProps {
  onEmojiSelected?(emoji: string): void;
  onClose(): void;
  visible: boolean;
}

export const EmojiPopup: FC<EmojiPopupProps> = (props) => {
  const premiumEmojisEnabled = Settings.getSettings().premiumEmojis;
  const classes = classNames("emojiPopup", {
    "emojiPopup--visible": props.visible,
  });

  function onEmojiClick(emoji: string) {
    props.onEmojiSelected?.(emoji);
  }

  return (
    <div className={classes}>
      <div className="emojiPopup__header">
        <p>Emoji menu</p>
        <CloseIcon onClick={props.onClose} />
      </div>
      <div className="emojiPopup__collection">
        {emojiConfig.defaultEmojis.map((emoji) => (
          <EmojiItem key={emoji} emoji={emoji} onClick={onEmojiClick} />
        ))}
      </div>
      {premiumEmojisEnabled && (
        <div className="emojiPopup__collection">
          {emojiConfig.premiumEmojis.map((emoji) => (
            <EmojiItem key={emoji} emoji={emoji} onClick={onEmojiClick} />
          ))}
        </div>
      )}
    </div>
  );
};
