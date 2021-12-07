import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import "./LobbyDetails.scss";
import { Button, Card, message } from "@components/atoms";
import CheckIcon from "@material-ui/icons/Check";
import RouteUtils from "@utils/Route";
import { clearLobbyState, setPlayerReady } from "@redux/actions";
import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";

interface LobbyDetailsProps {
  className: string;
}

const LobbyDetails: FC<LobbyDetailsProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = classNames("lobbyDetails", props.className);
  const lobbyState = useSelector((state: RootState) => state.lobby);
  const { user } = useSelector((state: RootState) => state.user);

  function onCopyRoomCode() {
    copy(lobbyState.roomCode);
    message.message("Copied to clipboard", "success", "right");
  }

  function onLeave() {
    dispatch(clearLobbyState());
    history.push(RouteUtils.routes.app.main.dashboard.path);
  }

  function onReady() {
    dispatch(setPlayerReady(user.username));
  }

  const youReady = lobbyState.players.find(function (player: ILobbyPlayer) {
    return player.username === user.username;
  }).ready;

  return (
    <Card
      className={classes}
      title={`Lobby for room ${lobbyState.roomCode}`}
    >
      <ul className="lobbyDetails__list">
        <li>{`Game is ${lobbyState.isPrivate ? "private" : "public"}`}</li>
        <li>Game reward - {lobbyState.gamePrice} coins</li>
        <li>Lobby size - {lobbyState.playerCount} players</li>
        <li>Game rules - {lobbyState.gameRules}</li>
      </ul>
      <div className="lobbyDetails__actions">
        <Button onClick={onCopyRoomCode} type="ghost">Copy room code</Button>
        <Button onClick={onLeave} type="ghost">Leave</Button>
        <Button icon={<CheckIcon />} onClick={onReady} type={youReady ? "disabled" : "accent"}>Ready</Button>
      </div>
    </Card>
  );
};

export default LobbyDetails;
