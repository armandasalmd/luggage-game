import SocketManager from "../SocketManager";

const joinLobbyAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("lobby join", roomId);
};

const leaveLobbyAsync = async () => {
  return SocketManager.getInstance().emitEventAsync("lobby leave", {});
};

export { joinLobbyAsync, leaveLobbyAsync };
