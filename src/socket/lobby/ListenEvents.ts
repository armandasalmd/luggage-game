import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import SocketManager from "@socket/SocketManager";

const playerJoinedListener = (callback: (player: ILobbyPlayer) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player joined", callback);
};

const playerLeftListener = (callback: (username: string) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player left", callback);
};

export { playerJoinedListener, playerLeftListener };
