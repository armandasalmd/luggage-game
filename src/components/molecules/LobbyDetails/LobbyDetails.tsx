import { FC } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import "./LobbyDetails.scss";
import { Button, Card, message } from "@components/atoms";
import { IGameDetails } from "@utils/game/Game";
import CheckIcon from "@material-ui/icons/Check";
import RouteUtils from "@utils/Route";

interface LobbyDetailsProps extends IGameDetails {
  gameId: string;
  className: string;
}

const LobbyDetails: FC<LobbyDetailsProps> = (props) => {
  const history = useHistory();
  const classes = classNames("lobbyDetails", props.className);

  function onCopyRoomCode() {
    copy(props.gameId);
    message.success("Copied to clipboard");
  }

  function onLeave() {
    history.push(RouteUtils.routes.app.main.dashboard.path);
  }

  function onReady() {
    history.push(RouteUtils.routes.app.main.game.path + "/" + props.gameId);
  }

  return (
    <Card
      className={classes}
      title={`Lobby for room ${props.gameId}`}
    >
      <ul className="lobbyDetails__list">
        <li>{`Game is ${props.isPrivate ? "private" : "public"}`}</li>
        <li>Game reward - {props.reward} coins</li>
        <li>Lobby size - {props.playerCount} players</li>
        <li>Game rules - {props.rules}</li>
      </ul>
      <div className="lobbyDetails__actions">
        <Button onClick={onCopyRoomCode} type="ghost">Copy room code</Button>
        <Button onClick={onLeave} type="ghost">Leave</Button>
        <Button icon={<CheckIcon />} onClick={onReady} type="accent">Ready</Button>
      </div>
    </Card>
  );
};

export default LobbyDetails;
