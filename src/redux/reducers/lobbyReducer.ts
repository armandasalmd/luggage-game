import { IAction, ActionTypes } from "@redux/actions";

export interface ILobbyPlayer {
  avatar?: string;
  username: string;
  ready: boolean;
  seatId: number;
  waving?: boolean;
}

export interface ILobbyState {
  playerCount?: number;
  gamePrice?: number;
  isPrivate?: boolean;
  gameRules?: string;
  players: ILobbyPlayer[];
  roomCode?: string;
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
    case ActionTypes.LobbyPlayerJoined:
      if (payload) {
        state.players.push(payload);
      }
      return {...state};
    case ActionTypes.LobbyPlayerLeft:
      state.players = state.players.filter(function (player) {
        return player.username !== payload;
      });
      for (const player of state.players) {
        player.ready = false;
      }
      return {...state};
    case ActionTypes.SetPlayerWaveState: {
      const playerIdx = state.players.findIndex(item => item.username === payload.username);
      if (playerIdx >= 0) state.players[playerIdx].waving = payload.value;
      return {...state};
    }
    default:
      return state;
  }
};

export default reducer;