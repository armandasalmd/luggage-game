import { FC } from "react";
import classNames from "classnames";
import "./PlayerCard.scss";
import { ColorType } from "@utils/Types";

interface PlayerCardProps {
  avatarUrl?: string;
  secondsLeft?: number;
  labelColor?: ColorType;
  username: string;
  label: string;
}

const PlayerCard: FC<PlayerCardProps> = (props) => {
  const classes = classNames("playerCard", {
    "playerCard--secondary": props.labelColor === "secondary"
  });

  return (
    <div className={classes}>
      <div className="playerCard__avatar">
        <img width="50" height="50" alt="avatar" src={props.avatarUrl || "/images/avatar.png"} />
      </div>
      <div className="playerCard__textGroup">
        <p className="playerCard__name">
          {props.username}
        </p>
        <span className="playerCard__label">
          {props.label}
        </span>
      </div>
    </div>
  )
};

export default PlayerCard;
