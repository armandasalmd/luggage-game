import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";

export const setErrorMessage = (message: string) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.SetErrorMessage,
      payload: message,
    };

    dispatch(action);
  };
};

export const setErrorFields = (object: any) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.SetErrorFields,
      payload: object,
    };

    dispatch(action);
  };
};

export const resetErrors = () => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.ResetErrors,
    });
  };
};
