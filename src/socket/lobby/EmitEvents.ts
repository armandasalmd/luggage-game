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

const subscribeToPublicLobbiesAsync = async (subscribeState: boolean) => {
  return SocketManager.getInstance().emitEventAsync(
    "lobby public subscribe",
    subscribeState
  );
};

const waveAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("lobby wave", roomId);
};

export {
  joinLobbyAsync,
  leaveLobbyAsync,
  playerReadyAsync,
  subscribeToPublicLobbiesAsync,
  waveAsync,
};
