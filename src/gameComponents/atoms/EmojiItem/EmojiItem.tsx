import { FC } from "react";
import "./EmojiItem.scss";

import { EmojiSvg } from "../../emojis";

interface EmojiItemProps {
  animating?: boolean;
  emoji: string;
  onClick(emoji: String): void;
}

export const EmojiItem: FC<EmojiItemProps> = (props) => {
  return <div className="emojiItem" onClick={props.onClick.bind(null, props.emoji)}>
    <EmojiSvg name={props.emoji} />
  </div>;
};