import { IAction, ActionTypes } from "@redux/actions";
import { Dispatch } from "redux";

export const loginUser = () => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.Login,
    };

    dispatch(action);
  };
};

export const logoutUser = () => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.Logout,
    };

    dispatch(action);
  };
};
