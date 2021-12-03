import { FC } from "react";
import { createRipples } from "react-ripples";
import classNames from "classnames";
import "./PlayerCard.scss";
import { ColorType } from "@utils/Types";
import CardTravelIcon from "@material-ui/icons/CardTravel";

const Ripple = createRipples({
  during: 600,
  color: "rgba(0, 0, 0, .15)",
  className: " defaultBorderRadius playerCard__luggage",
});

export interface PlayerCardProps {
  avatarUrl?: string;
  secondsLeft?: number;
  labelColor?: ColorType;
  username: string;
  label: string;
  active?: boolean;
}

const PlayerCard: FC<PlayerCardProps> = (props) => {
  const classes = classNames("playerCard", {
    "playerCard--secondary": props.labelColor === "secondary",
    "playerCard--active": props.active,
  });

  return (
    <div className={classes}>
      <div className="playerCard__avatar">
        <img alt="avatar" src={props.avatarUrl || "/images/avatar.png"} />
      </div>
      <div className="playerCard__textGroup">
        <p className="playerCard__name">{props.username}</p>
        <span className="playerCard__label">{props.label}</span>
      </div>
      <Ripple>
        <CardTravelIcon />
      </Ripple>
    </div>
  );
};

export default PlayerCard;
