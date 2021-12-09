import RouteUtils from "@utils/Route";
import { Dispatch } from "redux";
import { IAction, ActionTypes } from "@redux/actions";
import { setLobbyState } from "@redux/actions";

export const initialiazeGameState = (roomId: string) => {
  return function (dispatch: Dispatch) {
    const route = RouteUtils.routes.api.game.getInitialState;
    const request = RouteUtils.sendApiRequest(route, { roomId });

    request.then(function (res) {
      if (res.data) {
        const { lobby, ...gameState } = res.data;

        const action: IAction = {
          type: ActionTypes.SetGameState,
          payload: gameState
        };

        dispatch(action);
        setLobbyState(lobby)(dispatch);
      }
    });
  }
};