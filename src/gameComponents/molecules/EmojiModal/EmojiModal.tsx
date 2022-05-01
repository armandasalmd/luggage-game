import { FC } from "react";
import { useDarkScreenCover } from "@engine/hooks/useDarkScreenCover";

import "./EmojiModal.scss";

interface EmojiModalProps {
  onEmojiSelected?(emoji: string): void;
}

export const EmojiModal: FC<EmojiModalProps> = (props) => {
  useDarkScreenCover();

  return <p>Hello wolrd</p>;
};
