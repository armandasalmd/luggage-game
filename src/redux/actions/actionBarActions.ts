import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";

export const setPickCardCountItems = (pickItems: number[]) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.SetPickCardCountItems,
      payload: pickItems,
    };

    dispatch(action);
  };
};
