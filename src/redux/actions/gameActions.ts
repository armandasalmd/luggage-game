import { Dispatch } from "redux";
import { ActionTypes } from "@redux/actions";
import { GetGameStateResponse, IServerEmoji } from "@engine/interfaces/server";
import { IGameDetails, IMyPlayerState, IPlayerPushedCards, IPublicPlayerState, IReduxGameState, TakeLuggageResult } from "@engine/interfaces";
import { sortStringCards, IGameRewards } from "@engine/index";

const instantDispatch = (type: ActionTypes, payload: any) => {
  return function (dispatch: Dispatch) {
    dispatch({ type, payload });
  };
};

export const loadInitialGameState = (state: GetGameStateResponse) => {
  state.myState.handCards = sortStringCards(state.myState.handCards);

  return instantDispatch(ActionTypes.LoadInitialGameState, state as IReduxGameState);
}

export const receiveEmoji = (data: IServerEmoji) => instantDispatch(ActionTypes.SetAnimatingEmoji, data);
export const clearEmoji = (username: string) => instantDispatch(ActionTypes.SetAnimatingEmoji, {
  sender: username,
  emojiId: "",
} as IServerEmoji);

export const appendToSubmitQueue = (cards: string[]) => instantDispatch(ActionTypes.AppendToSubmitQueue, cards);
export const appendToPlayDeck = (cards: string[]) => instantDispatch(ActionTypes.AppendToPlayDeck, cards);
export const pickLuggageCard = (card: string) => instantDispatch(ActionTypes.PickLuggageCard, card);
export const setHandCards = (cards: string[]) => instantDispatch(ActionTypes.SetHandCards, cards);
export const updateMyState = (state: IMyPlayerState) => instantDispatch(ActionTypes.UpdateMyState, state);
export const updateGameDetails = (state: IGameDetails) => instantDispatch(ActionTypes.UpdateGameDetails, state);
export const gameEnded = (state: IGameRewards) => instantDispatch(ActionTypes.GameEnded, state);
export const clearGameState = () => instantDispatch(ActionTypes.ClearGameState, null);
export const playerPushedCards = (data: IPlayerPushedCards) => instantDispatch(ActionTypes.PlayerPushedCards, data);
export const clearPlayDeck = () => instantDispatch(ActionTypes.ClearPlayDeck, null);
export const patchPublicPlayer = (data: Partial<IPublicPlayerState>) => instantDispatch(ActionTypes.PatchPublicPlayer, data);
export const luggageUpdate = (data: TakeLuggageResult) => instantDispatch(ActionTypes.LuggageUpdate, data);