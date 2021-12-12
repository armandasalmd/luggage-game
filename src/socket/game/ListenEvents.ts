import SocketManager from "@socket/SocketManager";
import { IGameDetails, IMyPlayerState, IPublicPlayerState } from "@utils/game/IGameState";

const gameDetailsListener = (callback: (gameDetails: IGameDetails) => void) => {
  SocketManager.getInstance().listenToEvent("game details change", callback);
};

const myPlayerListener = (callback: (myPlayer: IMyPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game my state change", callback);
};

const publicPlayerListener = (callback: (myPlayer: IPublicPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game player state change", callback);
};

export {
  gameDetailsListener,
  myPlayerListener,
  publicPlayerListener
};
