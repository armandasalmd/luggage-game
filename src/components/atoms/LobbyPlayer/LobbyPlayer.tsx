import { FC } from "react";
import classNames from "classnames";
import "./LobbyPlayer.scss";
import { IPlayer } from "@utils/game/Game";
import CheckIcon from "@material-ui/icons/CheckCircle";

interface LobbyPlayerProps {
  player?: IPlayer;
  emptyLabel?: string;
}

const LobbyPlayer: FC<LobbyPlayerProps> = (props) => {
  const classes = classNames("lobbyPlayer", {
    "lobbyPlayer--empty": !props.player,
    "lobbyPlayer--ready": props.player?.ready,
  });

  if (!props.player) {
    return (
      <div className={classes}>
        <p className="lobbyPlayer__textCenter">
          {props.emptyLabel || "Player"}
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes}>
        <div className="lobbyPlayer__avatar">
          <img
            alt={props.player.username}
            src={props.player.avatar || "/images/avatar.png"}
          />
        </div>
        <p className="lobbyPlayer__name">{props.player.username}</p>
        {props.player.ready && <CheckIcon className="lobbyPlayer__check" />}
      </div>
    );
  }
};

export default LobbyPlayer;
