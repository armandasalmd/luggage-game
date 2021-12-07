import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";
import { ILobbyState } from "@redux/reducers/lobbyReducer";

export const setLobbyState = (state: ILobbyState) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.SetLobbyState,
      payload: state,
    };

    dispatch(action);
  };
};

export const clearLobbyState = () => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.ClearLobbyState
    });
  }
};

export const setPlayerReady = (username: string) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.LobbyPlayerReady,
      payload: username
    });
  }
}