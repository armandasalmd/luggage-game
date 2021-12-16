import SocketManager from "../SocketManager";

const playCardAsync = async (roomId: string, cards: string[]) => {
  return SocketManager.getInstance().emitEventAsync("game play card", {
    roomId,
    cards,
  });
};

const finishTurnAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("game finish turn", {
    roomId,
  });
};

const surrenderAsync = async () => {
  return SocketManager.getInstance().emitEventAsync("game surrender", {});
};

const takeLuggageAsync = async (roomId: string, luggageCard: string) => {
  return SocketManager.getInstance().emitEventAsync("game take luggage", {
    roomId,
    luggageCard,
  });
};

export { playCardAsync, finishTurnAsync, surrenderAsync, takeLuggageAsync };
