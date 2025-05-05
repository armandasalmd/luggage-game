import { IAction, ActionTypes } from "@redux/actions";
import {
  IReduxGameState,
  PlayerState,
  GameRulesType,
  GameStatus,
  IGameRewards,
  IPlayerPushedCards,
  IPublicPlayerState,
  TakeLuggageResult,
} from "@engine/index";
import { sortStringCards } from "@engine/index";

const initialState: IReduxGameState = {
  gameDetails: {
    activeSeatId: 0,
    deadCardsCount: 0,
    gameId: "",
    playDeck: [],
    sourceDeckCount: 52,
    price: 0,
    rules: GameRulesType.Classic,
  },
  myState: {
    handCards: [],
    luggageCards: "",
    seatId: 0,
    status: PlayerState.Playing,
    submitQueue: [],
  },
  playersState: [],
  status: GameStatus.Loading,
};

const cloneState = (): IReduxGameState => {
  return {
    gameDetails: { ...initialState.gameDetails },
    myState: { ...initialState.myState },
    playersState: [...initialState.playersState],
    status: initialState.status,
  };
};

const reducer = (
  state = cloneState(),
  { type, payload }: IAction
): IReduxGameState => {
  switch (type) {
    case ActionTypes.AppendToSubmitQueue:
      state.myState.submitQueue.push(...payload);
      return { ...state };
    case ActionTypes.AppendToPlayDeck:
      state.gameDetails.playDeck.push(...payload);
      return { ...state };
    case ActionTypes.PickLuggageCard:
      state.myState.handCards.push(payload);
      state.myState.luggageCards = state.myState.luggageCards.replace(payload, "");
      return { ...state };
    case ActionTypes.ClearPlayDeck:
      state.gameDetails.playDeck = [];
      return { ...state };
    case ActionTypes.ClearGameState:
      return cloneState();
    case ActionTypes.GameEnded: {
      const { winners, looser } = payload as IGameRewards;

      [...winners, looser].forEach((o) => {
        let playerState = state.playersState.find(
          (p) => p.username === o.username
        );

        if (!playerState) {
          // My player case
          state.myState.reward = o.reward;
          state.myState.status = o.playerState;
        } else {
          playerState.reward = o.reward;
          playerState.status = o.playerState;
        }
      });

      state.gameDetails.activeSeatId = 0;

      return {
        ...state,
        status: GameStatus.Ended,
      };
    }
    case ActionTypes.LoadInitialGameState:
      return { ...payload, status: GameStatus.Running };
    case ActionTypes.LuggageUpdate: {
      const q = payload as TakeLuggageResult;
      const player = state.playersState.find((o) => o.seatId === q.seatId);
      if (player) {
        player.luggageCards = q.newLuggage;
        return { ...state };
      }
      return state;
    }
    case ActionTypes.PatchPublicPlayer: {
      const { username, ...rest } = payload as Partial<IPublicPlayerState>;
      const playerIdx = state.playersState.findIndex(
        (p) => p.username === username
      );
      if (playerIdx > -1) {
        state.playersState[playerIdx] = {
          ...state.playersState[playerIdx],
          ...rest,
        };
      }
      return { ...state };
    }
    case ActionTypes.PlayerClickedPlayAgain: {
      const p = state.playersState.find(o => o.username === payload);
      if (p) p.clickedPlayAgain = true;
      return { ...state };
    }
    case ActionTypes.PlayerPushedCards: {
      const p = payload as IPlayerPushedCards;
      state.gameDetails.playDeck.push(...p.cards);
      return { ...state };
    }
    case ActionTypes.SetAnimatingEmoji: {
      const p = state.playersState.find((o) => o.username === payload.sender);
      if (p) p.animatingEmoji = payload.emojiId;
      return { ...state };
    }
    case ActionTypes.SetHandCards: {
      return {
        ...state,
        myState: {
          ...state.myState,
          handCards: payload,
        },
      };
    }
    case ActionTypes.UpdateGameDetails: {
      state.gameDetails = {
        ...state.gameDetails,
        ...payload,
      };
      return { ...state };
    }
    case ActionTypes.UpdateMyState: {
      state.myState = {
        ...state.myState,
        ...payload,
      };
      state.myState.handCards = sortStringCards(state.myState.handCards);
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
