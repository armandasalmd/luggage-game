import { IAction, ActionTypes } from "@redux/actions";
import IGameState from "@utils/game/IGameState";

const initialState: IGameState = {
  gameDetails: {
    activeSeatId: 0,
    deadCardsCount: 0,
    sourceCardsCount: 52,
    topPlayCard: "",
  },
  myState: {
    handCards: [],
    luggageCards: "",
    playerState: "",
    seatId: 0,
    lastMoves: []
  },
  playersState: [],
};

const reducer = (state = { ...initialState }, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.SetGameState:
      return { ...payload };
    case ActionTypes.UpdateGameDetails:
      return {
        ...state,
        gameDetails: payload,
      };
    case ActionTypes.UpdateMyPlayer:
      return {
        ...state,
        myState: payload,
      };
    case ActionTypes.UpdatePublicPlayer: {
      if (!payload) return state;

      const playerIdx = state.playersState.findIndex(function (player) {
        return player.username === payload.username;
      });

      if (playerIdx < 0) return state;

      state.playersState[playerIdx] = payload;

      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
