import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";

export const setPickCardCountItems = (
  pickItems: number[],
  cardValue: string
) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.SetPickCardCountItems,
      payload: {
        items: pickItems,
        cardValue,
      },
    };

    dispatch(action);
  };
};

export const clearPickCardCount = () => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.SetPickCardCountItems,
      payload: {
        items: [],
        cardValue: "",
      },
    });
  };
};
