import { IAction, ActionTypes } from "@redux/actions";
import IGameState from "@utils/game/IGameState";

const initialState: IGameState = {
  gameDetails: {
    activeSeatId: 0,
    deadCardsCount: 0,
    sourceCardsCount: 52,
    topPlayCard: ""
  },
  myState: {
    handCards: [],
    luggageCards: "",
    playerState: "",
    seatId: 0
  },
  playersState: []
};

const reducer = (state = {...initialState}, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.SetGameState:
      return {...payload};
    default:
      return state;
  }
};

export default reducer;