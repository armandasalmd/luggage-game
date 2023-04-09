import SocketManager from "@socket/SocketManager";
import {
  IGameDetails,
  IGameRewards,
  IServerEmoji,
  IPlayerPushedCards,
  IPublicPlayerState,
  TakeLuggageResult,
} from "@engine/interfaces/server";

export const emojiListener = (callback: (emoji: IServerEmoji) => void) =>
  SocketManager.getInstance().listenToEvent("game emoji", callback);

export const gameDetailsListener = (
  callback: (gameDetails: IGameDetails) => void
) =>
  SocketManager.getInstance().listenToEvent("game details changed", callback);

export const luggageTakenListener = (
  callback: (result: TakeLuggageResult) => void
) => SocketManager.getInstance().listenToEvent("game luggage taken", callback);

export const playerPushedCardsListener = (
  callback: (result: IPlayerPushedCards) => void
) =>
  SocketManager.getInstance().listenToEvent(
    "game player pushed cards",
    callback
  );

export const publicPlayerPatchListener = (
  callback: (state: Partial<IPublicPlayerState>) => void
) =>
  SocketManager.getInstance().listenToEvent(
    "game public player changed",
    callback
  );

export const theEndListener = (callback: (rewards: IGameRewards) => void) =>
  SocketManager.getInstance().listenToEvent("game ended", callback);
