import { FC, useState } from "react";
import classNames from "classnames";

import "./LobbyPlayer.scss";
import { IPlayer } from "@utils/interfaces";
import CheckIcon from "@material-ui/icons/CheckCircle";
import HelloIcon from "@material-ui/icons/PanTool";
import GlobalUtils from "@utils/Global";

interface LobbyPlayerProps {
  player?: IPlayer;
  emptyLabel?: string;
  itsMe?: boolean;
  onWave?(): void;
}

const LobbyPlayer: FC<LobbyPlayerProps> = (props) => {
  const [iWave, setIWave] = useState(false);

  const classes = classNames("lobbyPlayer", {
    "lobbyPlayer--empty": !props.player,
    "lobbyPlayer--ready": props.player?.ready,
  });

  function wave() {
    GlobalUtils.callIfFunction(props.onWave);
    setIWave(true);
    setTimeout(() => {
      setIWave(false);
    }, 6000)
  }

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
            alt="avatar"
            {...GlobalUtils.avatarImageProps(props.player.avatar)}
          />
        </div>
        <p className="lobbyPlayer__name">{props.player.username}</p>
        {props.player.ready && <CheckIcon className="lobbyPlayer__check" />}
        {!iWave && !props.player.ready && props.itsMe && (
          <HelloIcon className="lobbyPlayer__hand" onClick={wave} />
        )}
        {props.player.waving === true && (
          <div className="lobbyPlayer__wave">
            <img alt="wave" src="/images/wave.png" />
          </div>
        )}
      </div>
    );
  }
};

export default LobbyPlayer;
