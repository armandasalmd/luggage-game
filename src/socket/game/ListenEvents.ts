import SocketManager from "@socket/SocketManager";
import { IGameDetails, IMyPlayerState, IPublicPlayerState, ILooser } from "@engine/index";
import { IPlayerReward } from "@engine/interfaces/IPlayerReward";

const gameDetailsListener = (callback: (gameDetails: IGameDetails) => void) => {
  SocketManager.getInstance().listenToEvent("game details change", callback);
};

const myPlayerListener = (callback: (myPlayer: IMyPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game my state change", callback);
};

const publicPlayerListener = (callback: (myPlayer: IPublicPlayerState) => void) => {
  SocketManager.getInstance().listenToEvent("game player state change", callback);
};

const gameFinishedListener = (callback: (rewards: IPlayerReward[]) => void) => {
  SocketManager.getInstance().listenToEvent("game finished", callback);
};

const gameRewardListener = (callback: (reward: number) => void) => {
  SocketManager.getInstance().listenToEvent("game reward", callback);
};

const looserListener = (callback: (looser: ILooser) => void) => {
  SocketManager.getInstance().listenToEvent("game looser", callback);
};

export {
  gameDetailsListener,
  myPlayerListener,
  publicPlayerListener,
  gameFinishedListener,
  gameRewardListener,
  looserListener
};
