import { FC, useState } from "react";
import classNames from "classnames";
import "./PlayerCard.scss";

import { TimedAvatar } from "../TimedAvatar/TimedAvatar";
import GlobalUtils from "@utils/Global";

export interface PlayerCardProps {
  active?: boolean;
  avatarUrl?: string;
  extraLabel?: string;
  label: string;
  onDown?(): void;
  onUp?(): void;
  username: string;
}

export const PlayerCard: FC<PlayerCardProps> = (props) => {
  const [isDown, setIsDown] = useState(false);
  const classes = classNames("playerCard", {
    "playerCard--active": props.active,
    "playerCard--elevated": isDown
  });

  function onDown() {
    if (GlobalUtils.isSmallScreen()) {
      GlobalUtils.callIfFunction(props.onDown);
      setIsDown(true);
    }
  }

  function onUp() {
    if (GlobalUtils.isSmallScreen()) {
      GlobalUtils.callIfFunction(props.onUp);
      setIsDown(false);
    }
  }

  return (
    <div className={classes} onMouseDown={onDown} onMouseUp={onUp} onTouchStart={onDown} onTouchEnd={onUp}>
      <TimedAvatar className="playerCard__avatar" running={!!props.active} avatarUrl={props.avatarUrl} />
      <div className="playerCard__textGroup">
        <p className="playerCard__name">{props.username}</p>
        <span className="playerCard__label">{props.label}</span>
      </div>
      {props.extraLabel && <span className="playerCard__extraLabel">{props.extraLabel}</span>}
    </div>
  );
};
