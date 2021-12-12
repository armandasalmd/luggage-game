import { IAction, ActionTypes } from "@redux/actions";

export interface IActionBarState {
  pickPlayCountItems: number[];
}

const initialState: IActionBarState = {
  pickPlayCountItems: [],
};

const reducer = (state = {...initialState}, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.SetPickCardCountItems:
      return { ...state, pickPlayCountItems: payload };
    default:
      return state;
  }
};

export default reducer;