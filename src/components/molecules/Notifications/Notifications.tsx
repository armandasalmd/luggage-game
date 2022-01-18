import { FC, useState } from "react";
import classNames from "classnames";

import "./Notifications.scss";
import { PillButton, NotificationItem } from "@components/atoms";
import NotifIcon from "@material-ui/icons/Notifications";
import NotifActiveIcon from "@material-ui/icons/NotificationsActive";
import CloseIcon from "@material-ui/icons/Close";
import { INotification } from "@utils/game/INotification";
import { ActionButton } from "@components/atoms/NotificationItem/NotificationItem";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = (props) => {
  const notifIcon = false ? <NotifIcon /> : <NotifActiveIcon />;
  const [open, setOpen] = useState(false);

  const item: INotification = {
    description: "Klaidonsas has invited you to join lobby classic game lobby",
    title: "Lobby invite",
    type: "lobbyInvite",
    metaData: {
      players: 3,
      playersMax: 5,
      price: 10000,
    },
    date: new Date()
  };

  const item2: INotification = {
    image: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2992003664389087&height=50&width=50&ext=1643306808&hash=AeQw1E_P2NOvdQUQhGY",
    description: "Requested to add you as a friend",
    title: "Tomas Sargautis",
    type: "friendInvite",
    date: new Date()
  };

  const item3: INotification = {
    description: "Requested to add you as a friend",
    title: "Jonas Petrovas",
    type: "friendInvite",
    date: new Date()
  };

  const accept: ActionButton = {
    text: "Accept",
    type: "primary",
    onClick: (item: INotification) => console.log("Accept:", item)
  };

  const reject: ActionButton = {
    text: "Reject",
    type: "secondary",
    onClick: (item: INotification) => console.log("Reject:", item)
  };

  const actions = [accept, reject];
  const classes = classNames("notif", {
    "notif--hidden": !open
  });

  const toggle = () => setOpen(!open);

  return (
    <>
      <PillButton onClick={toggle} prefix={notifIcon} colorType="secondary">
        3
      </PillButton>
      <div className={classes}>
        <div className="notif__header">
          <p className="notif__headerTitle">All notifications</p>
          <CloseIcon onClick={toggle} className="notif__headerClose" />
        </div>
        <div className="notif__items">
          <NotificationItem data={item} actions={actions} />
          <NotificationItem data={item2} actions={actions} />
          <NotificationItem data={item3} actions={actions} />
        </div>
        <div className="notif__footer" onClick={toggle}>
          <span>Close panel</span>
        </div>
      </div>
    </>
  );
};

export default Notifications;
