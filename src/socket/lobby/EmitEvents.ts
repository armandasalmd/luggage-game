import SocketManager from "../SocketManager";

const joinLobbyAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("lobby join", roomId);
};

const leaveLobbyAsync = async () => {
  return SocketManager.getInstance().emitEventAsync("lobby leave", {});
};

const playerReadyAsync = async () => {
  return SocketManager.getInstance().emitEventAsync("lobby ready", {});
};

export { joinLobbyAsync, leaveLobbyAsync, playerReadyAsync };
