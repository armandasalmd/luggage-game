import { FC } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import "./LobbyDetails.scss";
import { Button, Card } from "@components/atoms";
import { IGameDetails } from "@utils/game/Game";
import CheckIcon from "@material-ui/icons/Check";

interface LobbyDetailsProps extends IGameDetails {
  gameId: string;
  className: string;
}

const LobbyDetails: FC<LobbyDetailsProps> = (props) => {
  const history = useHistory();
  const classes = classNames("lobbyDetails", props.className);

  function onCopyRoomCode() {
    console.log("Copy room code");
  }

  function onLeave() {
    console.log("Leave");
  }

  function onReady() {
    history.push("/play/" + props.gameId);
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
