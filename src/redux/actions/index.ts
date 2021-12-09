import { AnyAction } from "redux";

export interface IAction extends AnyAction {
  payload?: any;
}

export enum ActionTypes {
  Login,
  Logout,
  SetErrorMessage,
  SetErrorFields,
  ResetErrors,
  SetLobbyState,
  ClearLobbyState,
  LobbyPlayerReady,
  LobbyPlayerJoined,
  LobbyPlayerLeft,
  SetGameState
};

export * from "./lobbyActions";
export * from "./userActions";
export * from "./errorActions";