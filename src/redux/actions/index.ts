import { AnyAction } from "redux";

export interface IAction extends AnyAction {
  payload?: any;
}

export enum ActionTypes {
  AddCoins,
  AppendToPlayDeck,
  AppendToSubmitQueue,
  PickLuggageCard,
  ClearPlayDeck,
  ClearGameState,
  ClearLobbyState,
  GameEnded,
  LoadInitialGameState,
  LobbyPlayerJoined,
  LobbyPlayerLeft,
  LobbyPlayerReady,
  Login,
  Logout,
  LuggageUpdate,
  PatchPublicPlayer,
  PlayerPushedCards,
  ResetErrors,
  SetAnimatingEmoji,
  SetCoinsAndRewards,
  SetErrorFields,
  SetErrorMessage,
  SetGameState,
  SetHandCards,
  SetLobbyState,
  SetPlayerWaveState,
  UpdateGameDetails,
  UpdateMyState,
  UpdateReward,
};

export * from "./errorActions";
export * from "./gameActions";
export * from "./lobbyActions";
export * from "./userActions";