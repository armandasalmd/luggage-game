import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import "./LobbyDetails.scss";
import { Button, Card, DisplayItem, message } from "@components/atoms";
import CheckIcon from "@material-ui/icons/Check";
import RouteUtils from "@utils/Route";
import { clearLobbyState, setPlayerReady } from "@redux/actions";
import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import { leaveLobbyAsync, playerReadyAsync } from "@socket/lobby";
import GlobalUtils from "@utils/Global";

import LockIcon from "@material-ui/icons/LockOpenOutlined";
import CoinIcon from "@material-ui/icons/TollOutlined";
import PeopleIcon from "@material-ui/icons/PeopleAltOutlined";
import GamepadIcon from "@material-ui/icons/GamepadOutlined";

interface LobbyDetailsProps {
  className: string;
  roomId: string;
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
    message.success("Room code copied to clipboard");
  }

  useEffect(() => {
    document.addEventListener("navbarLogoClick", onLeave);
    window.scrollTo({ top: 0 });
    return () => document.removeEventListener("navbarLogoClick", onLeave);
  });

  function onLeave() {
    leaveLobbyAsync()
      .then((result) => {
        if (result.success === true) {
          dispatch(clearLobbyState());
        } else {
          message.warning("Something went as not expected");
        }
        history.push(RouteUtils.routes.app.main.dashboard.path);
      })
      .catch(() => {
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
    });
  }

  const youReady =
    lobbyState.players.find(function (player: ILobbyPlayer) {
      return player.username === user.username;
    })?.ready ?? false;
  const readyDisabled =
    youReady || lobbyState.players.length !== lobbyState.playerCount;

  return (
    <Card className={classes} title={`Lobby for room ${lobbyState.roomCode}`}>
      <div className="lobbyDetails__list">
        <DisplayItem
          icon={<LockIcon />}
          title={`Game is ${lobbyState.isPrivate ? "private" : "public"}`}
          description={
            lobbyState.isPrivate
              ? "Only invited people can join"
              : "Everyone can join"
          }
        />
        <DisplayItem
          icon={<CoinIcon />}
          title={`Game price ${lobbyState.gamePrice}`}
          description={`Looser pays ${lobbyState.gamePrice}, others share`}
        />
        <DisplayItem
          icon={<PeopleIcon />}
          title={`Lobby size ${lobbyState.playerCount}`}
          description={`${lobbyState.playerCount} can play in game`}
        />
        <DisplayItem
          icon={<GamepadIcon />}
          title={`Game rules ${lobbyState.gameRules}`}
          description="2, 5, 10 powercards"
        />
      </div>
      <div className="lobbyDetails__actions">
        <Button onClick={onCopyRoomCode}>Copy ({props.roomId})</Button>
        <Button onClick={onLeave}>Leave</Button>
        <Button
          icon={<CheckIcon />}
          onClick={onReady}
          type={readyDisabled ? "disabled" : "accent"}
        >
          Ready
        </Button>
      </div>
    </Card>
  );
};

export default LobbyDetails;
