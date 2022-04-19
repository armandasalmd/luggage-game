import { FC, useEffect, useLayoutEffect } from "react";
import classNames from "classnames";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Notifications.scss";
import {
  PillButton,
  NotificationItem,
  Empty,
  Modal,
  Button,
} from "@components/atoms";
import NotifIcon from "@material-ui/icons/Notifications";
import NotifActiveIcon from "@material-ui/icons/NotificationsActive";
import CloseIcon from "@material-ui/icons/Close";
import {
  FriendMetaData,
  INotification,
  LobbyMetaData,
} from "@utils/interfaces";
import { ActionButton } from "@components/atoms/NotificationItem/NotificationItem";
import useNotifications from "@hooks/useNotifications";
import { setLobbyState } from "@redux/actions";
import { joinLobbyAsync } from "@socket/lobby";
import { message } from "@components/atoms";
import RouteUtils from "@utils/Route";

interface NotificationsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Notifications: FC<NotificationsProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    notifications,
    clearNotification,
    lobbyModalContent,
    setLobbyModalContent,
  } = useNotifications();
  const { open, setOpen } = props;

  const showGenericError = () =>
    message.warning("Cannot perform selected action");

  function respondToLobbyInvite(notif: INotification | null, accept: boolean) {
    if (!notif) return;
    const roomId = (notif.metaData as LobbyMetaData).roomId;

    if (roomId) {
      if (accept) {
        joinLobbyAsync(roomId).then(function (data) {
          if (data.success) {
            dispatch(setLobbyState(data.lobbyState));
            history.push("/lobby/" + data.lobbyState.roomCode);
          } else {
            message.information("Room is full or game has started");
            history.push(RouteUtils.routes.app.main.dashboard.path);
          }
        });
      }

      const route = RouteUtils.routes.api.lobby.respondInvite;
      RouteUtils.sendApiRequest(route, { roomCode: roomId, accept }).catch(() => {
        message.information("Room is full or game has started");
      });
    }
    clearNotification(notif);
    setLobbyModalContent(null);
  }

  function respondToFriendInvite(notif: INotification | null, accept: boolean) {
    if (!notif) return;
    const username = (notif.metaData as FriendMetaData).username;

    if (username) {
      const route = RouteUtils.routes.api.friends.respondInvite;
      RouteUtils.sendApiRequest(route, { username, accept }).catch(
        showGenericError
      );
    }
  }

  const accept: ActionButton = {
    text: "Accept",
    type: "primary",
    onClick: (item: INotification) => {
      if (item.type === "lobbyInvite") {
        respondToLobbyInvite(item, true);
      } else {
        respondToFriendInvite(item, true);
      }
      clearNotification(item);
    },
  };

  const reject: ActionButton = {
    text: "Reject",
    type: "secondary",
    onClick: (item: INotification) => {
      if (item.type === "lobbyInvite") {
        respondToLobbyInvite(item, false);
      } else {
        respondToFriendInvite(item, false);
      }
      clearNotification(item);
    },
  };

  const actions = [accept, reject];
  const classes = classNames("notif", {
    "notif--hidden": !open,
  });

  const toggle = () => setOpen(!open);
  const itemComponents = notifications.map((item, index) => (
    <NotificationItem data={item} actions={actions} key={index} />
  ));

  const notifIcon =
    itemComponents.length === 0 ? (
      <NotifIcon />
    ) : (
      <NotifActiveIcon className="waveAnimation" />
    );

  useEffect(() => {
    if (lobbyModalContent === null) return;
    // Small/big screens
    if (window.innerWidth < 500) {
      setOpen(false);
    }
  }, [lobbyModalContent, setOpen]);

  useLayoutEffect(() => {
    const closeFunc = () => setOpen(false);
    const elem = document.getElementById("screen-cover");

    if (elem) {
      elem.style.display = open ? "block" : "none";
      elem.addEventListener("click", closeFunc);
    }

    return () => {
      if (elem) {
        elem.removeEventListener("click", closeFunc);
      }
    }
  }, [open, setOpen]);

  return (
    <>
      <PillButton onClick={toggle} prefix={notifIcon} colorType="secondary">
        {" " + itemComponents.length}
      </PillButton>
      <div className={classes}>
        <div className="notif__header">
          <p className="notif__headerTitle">All notifications</p>
          <CloseIcon onClick={toggle} className="notif__headerClose" />
        </div>
        <div className="notif__items">
          {itemComponents.length === 0 ? (
            <Empty text="No new notifications" />
          ) : (
            itemComponents
          )}
        </div>
      </div>
      <Modal
        isOpen={!!lobbyModalContent}
        onClose={() => setLobbyModalContent(null)}
        flyInAnimation
        title="Invite to a game"
      >
        <h4 style={{ marginBottom: 16 }}>{lobbyModalContent?.description}</h4>
        <div style={{ display: "flex", gap: 8, justifyContent: "right" }}>
          <Button
            onClick={() => respondToLobbyInvite(lobbyModalContent, false)}
          >
            Reject
          </Button>
          <Button
            onClick={() => respondToLobbyInvite(lobbyModalContent, true)}
            type="accent"
          >
            Join lobby
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Notifications;
