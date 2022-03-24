import SocketManager from "@socket/SocketManager";
import { INotification } from "@utils/game/INotification";

const notificationsPushListener = (callback: (notifs: INotification[]) => void) => {
  SocketManager.getInstance().listenToEvent("notifications push", callback);
};

const listenerCleanup = () => {
  SocketManager.getInstance().removeListener("notifications push");
};

export {
  notificationsPushListener,
  listenerCleanup
};
