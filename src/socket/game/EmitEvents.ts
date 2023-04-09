import SocketManager from "../SocketManager";
import {
  FinishTurnResponse,
  SubscribeResponse,
  PlayCardsResponse
} from "@engine/interfaces/server";

export const finishTurnAsync = () =>
  SocketManager.getInstance().emitEventAsync<FinishTurnResponse>(
    "game finish turn",
    null
  );

export const playCardsAsync = (cards: string[]) =>
  SocketManager.getInstance().emitEventAsync<PlayCardsResponse>("game play cards", {
    cards,
  });

export const sendEmojiAsync = (emojiId: string) =>
  SocketManager.getInstance().emitEventHandleErrorAsync("game push emoji", {
    emojiId,
  });

export const subscribeAsync = () => SocketManager.getInstance().emitEventAsync<SubscribeResponse>("game subscribe", null);

export const surrenderAsync = () => SocketManager.getInstance().emitEventHandleErrorAsync("game surrender", null);

export const takeLuggageAsync = (luggageCard: string) =>
  SocketManager.getInstance().emitEventHandleErrorAsync("game take luggage", {
    luggageCard,
  });
