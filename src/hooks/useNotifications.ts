import { useEffect, useState } from "react";
import { message } from "@components/atoms";
import { INotification } from "@utils/game/INotification";
import RouteUtils from "@utils/Route";
import {
  listenerCleanup,
  notificationsPushListener,
} from "@socket/notification";

export default function useNotifications() {
  const [notifs, setNotifs] = useState<INotification[]>([]);
  const [lobbyModalContent, setLobbyModalContent] =
    useState<INotification | null>(null);

  function onPush(newNotifs: INotification[]) {
    setNotifs([...newNotifs, ...notifs]);

    if (lobbyModalContent === null) {
      const lobbyNotif = newNotifs.find((item) => item.type === "lobbyInvite");
      
      if (lobbyNotif) {
        setLobbyModalContent(lobbyNotif);
      }
    }
  }

  function clearNotification(notif: INotification) {
    if (notif) setNotifs(notifs.filter((item) => item !== notif));
  }

  useEffect(() => {
    const route = RouteUtils.routes.api.notification.getAll;

    RouteUtils.sendApiRequest(route)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setNotifs(res.data.data.notifications);
        }
      })
      .catch(() => {
        message.warning("Cannot retrieve notifications");
      });
  }, []);

  useEffect(() => {
    notificationsPushListener(onPush);

    return listenerCleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notifications: notifs,
    clearNotification,
    lobbyModalContent,
    setLobbyModalContent,
  };
}
