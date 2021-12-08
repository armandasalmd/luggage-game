import { ILobbyPlayer } from "@redux/reducers/lobbyReducer";
import SocketManager from "@socket/SocketManager";

const playerJoinedListener = (callback: (player: ILobbyPlayer) => void) => {
  SocketManager.getInstance().listenToEvent("lobby player joined", callback);
};

export { playerJoinedListener };
