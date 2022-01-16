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
  SetPlayerWaveState,
  UpdateGameDetails,
  UpdateMyPlayer,
  UpdatePublicPlayer,
  AddCoins,
  SetLuggageUsed,
  ClearGameState,
  SetGameReward,
  SetCoinsAndRewards,
  UpdateReward,
};

export * from "./actionBarActions";
export * from "./errorActions";
export * from "./gameActions";
export * from "./lobbyActions";
export * from "./userActions";