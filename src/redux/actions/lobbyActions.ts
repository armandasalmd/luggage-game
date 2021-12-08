import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";
import { ILobbyPlayer, ILobbyState } from "@redux/reducers/lobbyReducer";

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
      type: ActionTypes.ClearLobbyState,
    });
  };
};

export const setPlayerReady = (username: string) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.LobbyPlayerReady,
      payload: username,
    });
  };
};

export const playerJoined = (player: ILobbyPlayer) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.LobbyPlayerJoined,
      payload: player,
    });
  };
};

export const playerLeft = (username: string) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.LobbyPlayerLeft,
      payload: username,
    });
  };
};
