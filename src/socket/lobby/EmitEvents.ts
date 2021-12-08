import SocketManager from "../SocketManager";

const joinLobbyAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("lobby join", roomId);
};

export { joinLobbyAsync };
