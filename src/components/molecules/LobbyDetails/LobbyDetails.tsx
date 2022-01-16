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
import { leaveLobbyAsync, playerReadyAsync } from "@socket/lobby";
import GlobalUtils from "@utils/Global";

interface LobbyDetailsProps {
  className: string;
  startGame?(): void;
}

const LobbyDetails: FC<LobbyDetailsProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = classNames("lobbyDetails", props.className);
  const lobbyState = useSelector((state: RootState) => state.lobby);
  const { user } = useSelector((state: RootState) => state.user);

  function onCopyRoomCode() {
    copy(lobbyState.roomCode);
    message.success("Copied to clipboard");
  }

  function onLeave() {
    leaveLobbyAsync().then(result => {
      if (result.success === true) {
        dispatch(clearLobbyState());
      } else {
        message.warning("Something went as not expected");
      }
      history.push(RouteUtils.routes.app.main.dashboard.path);
    }).catch(() => {
      message.error("Unexpected error");
    });
  }

  function onReady() {
    playerReadyAsync().then(function (result) {
      if (result.success === true) {
        dispatch(setPlayerReady(user.username));

        if (result.gameCanStart === true) {
          GlobalUtils.callIfFunction(props.startGame);
        }
      } else {
        message.error("Unexpected error");
      }
    })
  }

  const youReady = lobbyState.players.find(function (player: ILobbyPlayer) {
    return player.username === user.username;
  })?.ready ?? false;
  const readyDisabled = youReady || lobbyState.players.length !== lobbyState.playerCount;

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
        <Button icon={<CheckIcon />} onClick={onReady} type={readyDisabled ? "disabled" : "accent"}>Ready</Button>
      </div>
    </Card>
  );
};

export default LobbyDetails;
