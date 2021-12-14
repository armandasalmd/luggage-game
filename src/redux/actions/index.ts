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
  SetGameState,
  SetPickCardCountItems,
  UpdateGameDetails,
  UpdateMyPlayer,
  UpdatePublicPlayer,
  AddCoins
};

export * from "./actionBarActions";
export * from "./errorActions";
export * from "./gameActions";
export * from "./lobbyActions";
export * from "./userActions";