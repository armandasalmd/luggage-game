import { IAction, ActionTypes } from "@redux/actions";

export interface ILobbyPlayer {
  avatar?: string;
  username: string;
  ready: boolean;
  seatId: number;
}

export interface ILobbyState {
  players: ILobbyPlayer[];
  roomCode?: string;
  playerCount?: number;
  gamePrice?: number;
  isPrivate?: boolean;
  gameRules?: string;
}

const initialState: ILobbyState = {
  players: []
};

const reducer = (state = {...initialState}, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.SetLobbyState:
      return {...payload};
    case ActionTypes.ClearLobbyState:
      return {...initialState};
    case ActionTypes.LobbyPlayerReady: {
      const player = state.players.find(function (player) {
        return player.username === payload;
      });

      if (player) {
        player.ready = true;
      }

      return {...state};
    }
    default:
      return state;
  }
};

export default reducer;