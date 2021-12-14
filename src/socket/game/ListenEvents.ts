import SocketManager from "@socket/SocketManager";
import { IGameDetails, IMyPlayerState, IPublicPlayerState } from "@utils/game/IGameState";
import { IPlayerReward } from "@utils/game/IPlayerReward";

const gameDetailsListener = (callback: (gameDetails: IGameDetails) => void) => {
  SocketManager.getInstance().listenToEvent("game details change", callback);
};

const myPlayerListener = (callback: (myPlayer: IMyPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game my state change", callback);
};

const publicPlayerListener = (callback: (myPlayer: IPublicPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game player state change", callback);
};

const onGameFinishedListener = (callback: (rewards: IPlayerReward[]) => void) => {
  SocketManager.getInstance().listenToEvent("game finished", callback);
};

export {
  gameDetailsListener,
  myPlayerListener,
  publicPlayerListener,
  onGameFinishedListener
};
