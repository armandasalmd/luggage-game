import RouteUtils from "@utils/Route";
import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";
import { setLobbyState } from "@redux/actions";
import {
  IGameDetails,
  IMyPlayerState,
  IPublicPlayerState,
} from "@utils/game/IGameState";

export const initialiazeGameState = (roomId: string) => {
  return async function (dispatch: Dispatch) {
    const route = RouteUtils.routes.api.game.getInitialState;

    try {
      const res = await RouteUtils.sendApiRequest(route, { roomId });

      if (res.data) {
        const { lobby, ...gameState } = res.data;

        const action: IAction = {
          type: ActionTypes.SetGameState,
          payload: gameState,
        };

        dispatch(action);
        setLobbyState(lobby)(dispatch);
      }
      return true;
    } catch {
      return false;
    }
  };
};

const instantDispatch = (type: ActionTypes, payload: any) => {
  return function (dispatch: Dispatch) {
    dispatch({ type, payload });
  };
};

export const updateGameDetails = (details: IGameDetails) =>
  instantDispatch(ActionTypes.UpdateGameDetails, details);

export const updateMyPlayer = (details: IMyPlayerState) =>
  instantDispatch(ActionTypes.UpdateMyPlayer, details);
export const updatePublicPlayer = (details: IPublicPlayerState) =>
  instantDispatch(ActionTypes.UpdatePublicPlayer, details);

export const setLuggageUsed = (luggageUsed: boolean) =>
  instantDispatch(ActionTypes.SetLuggageUsed, luggageUsed);

export const clearGameState = () =>
  instantDispatch(ActionTypes.ClearGameState, null);

export const setReward = (reward: number) =>
  instantDispatch(ActionTypes.SetGameReward, reward);
