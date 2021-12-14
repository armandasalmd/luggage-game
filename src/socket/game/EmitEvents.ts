import SocketManager from "../SocketManager";

const playCardAsync = async (roomId: string, cards: string[]) => {
  return SocketManager.getInstance().emitEventAsync("game play card", {
    roomId,
    cards
  });
};

const finishTurnAsync = async (roomId: string) => {
  return SocketManager.getInstance().emitEventAsync("game finish turn", {
    roomId
  });
};

const surrenderAsync = async () => {
  return SocketManager.getInstance().emitEventAsync("game surrender", {});
};

export { playCardAsync, finishTurnAsync, surrenderAsync };
