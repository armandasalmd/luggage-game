import { IAction, ActionTypes } from "@redux/actions";
import { RewardItem } from "@utils/game/Reward";

export interface IUserState {
  isAuthenticated: boolean;
  user: any;
  coins: number;
  rewards: RewardItem[];
}

const initialState: IUserState = {
  isAuthenticated: false,
  user: {},
  coins: 0,
  rewards: [],
};

const reducer = (state = { ...initialState }, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        coins: payload.coins,
      };
    case ActionTypes.Logout:
      return { ...initialState };
    case ActionTypes.AddCoins:
      return {
        ...state,
        coins: state.coins + (payload || 0),
      };
    case ActionTypes.SetCoinsAndRewards:
      if (payload.coins) state.coins = payload.coins;
      if (payload.rewards) state.rewards = payload.rewards;
      return {
        ...state,
      };
    case ActionTypes.UpdateReward: {
      const rewardIdx = state.rewards.findIndex(
        (item) => item.day === payload.day
      );

      if (rewardIdx >= 0) {
        state.rewards[rewardIdx] = payload;
      }

      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
