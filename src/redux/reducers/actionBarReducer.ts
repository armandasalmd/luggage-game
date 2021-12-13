import { IAction, ActionTypes } from "@redux/actions";

export interface IActionBarState {
  pickPlayCountItems: number[];
  cardValue: string;
}

const initialState: IActionBarState = {
  pickPlayCountItems: [],
  cardValue: "",
};

const reducer = (state = { ...initialState }, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.SetPickCardCountItems:
      return {
        ...state,
        pickPlayCountItems: payload.items,
        cardValue: payload.cardValue,
      };
    default:
      return state;
  }
};

export default reducer;
