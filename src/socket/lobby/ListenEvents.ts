import { IPublicGame } from "@components/atoms/GameListItem/GameListItem";
import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import SocketManager from "@socket/SocketManager";

const playerJoinedListener = (callback: (player: ILobbyPlayer) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player joined", callback);
};

const playerLeftListener = (callback: (username: string) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player left", callback);
};

const gameStartListener = (callback: () => void) => {
  SocketManager.getInstance().listenToEvent("game can start", callback);
};

const playerReadyListener = (callback: (username: string) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player ready", callback);
};

const publicLobbiesChangedListener = (
  callback: (lobbiesState: IPublicGame[]) => void
) => {
  SocketManager.getInstance().listenToEvent("lobbies changed", callback);
};

const playerWavedListener = (callback: (username: string) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player waved", callback);
};

export {
  playerJoinedListener,
  playerLeftListener,
  gameStartListener,
  playerReadyListener,
  playerWavedListener,
  publicLobbiesChangedListener,
};
