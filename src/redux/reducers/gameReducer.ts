import { IAction, ActionTypes } from "@redux/actions";
import { IGameState } from "@engine/index";

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
    lastMoves: [],
  },
  playersState: [],
  luggageUsed: false,
  reward: -1,
};

const reducer = (state = { ...initialState }, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.ClearGameState:
      return { ...initialState };
    case ActionTypes.SetGameReward:
      return {
        ...state,
        reward: payload,
      };
    case ActionTypes.SetGameState:
      return {
        ...payload,
        luggageUsed: state.luggageUsed,
        reward: state.reward,
      };
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
    case ActionTypes.SetLuggageUsed:
      return { ...state, luggageUsed: payload };
    default:
      return state;
  }
};

export default reducer;
