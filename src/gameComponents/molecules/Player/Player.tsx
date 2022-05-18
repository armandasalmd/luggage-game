import { FC, useState } from "react";
import classNames from "classnames";

import "./Player.scss";
import { PlayerCard, PlayerCardProps } from "../../atoms/PlayerCard/PlayerCard";
import { MiniLuggage, MiniLuggageModal } from "..";
import { ILuggage } from "@engine/index";
import { EmojiSvg } from "../../emojis";

interface PlayerProps {
  animatingEmoji?: string;
  className: string | string[];
  luggageProps: ILuggage;
  playerProps: PlayerCardProps;
  postEmojiAnimation: () => void;
}

export const Player: FC<PlayerProps> = (props) => {
  const [removeCollapsed, setRemoveCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = classNames("player", props.className);

  function onDown() {
    setModalOpen(true);

    const navbar = document.querySelector(".navbar");

    if (navbar && !navbar.classList.contains("navbar--collapsed")) {
      navbar.classList.add("navbar--collapsed");
      setRemoveCollapsed(true);
    }
  }

  function onUp() {
    setModalOpen(false);

    const navbar = document.querySelector(".navbar");

    if (navbar && removeCollapsed) {
      navbar.classList.remove("navbar--collapsed");
      setRemoveCollapsed(false);
    }
  }

  return (
    <div className={classes}>
      <PlayerCard
        onDown={onDown}
        onUp={onUp}
        {...props.playerProps}
        extraLabel={
          props.playerProps.username === "player1" ? "1st place" : undefined
        }>
        {props.animatingEmoji && <div style={{position: "absolute", top: 8, left: 4, width: 64, height: 64}}>
          <EmojiSvg name={props.animatingEmoji} animating onAnimationEnd={props.postEmojiAnimation} />
        </div>}
      </PlayerCard>
      {props.luggageProps && (
        <MiniLuggage
          className="gamePlayer__luggage"
          luggage={props.luggageProps}
        />
      )}
      {props.luggageProps && modalOpen && (
        <MiniLuggageModal
          username={props.playerProps.username}
          luggage={props.luggageProps}
        />
      )}
    </div>
  );
};
