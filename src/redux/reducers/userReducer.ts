import { IAction, ActionTypes } from "@redux/actions";

export interface IUserState {
  isAuthenticated: boolean;
  user: any;
  coins: number;
}

const initialState: IUserState = {
  isAuthenticated: false,
  user: {},
  coins: 0
};

const reducer = (state = {...initialState}, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.Login:
      return { 
        ...state,
        isAuthenticated: true,
        user: payload.user,
        coins: payload.coins
      };
    case ActionTypes.Logout:
      return {...initialState};
    case ActionTypes.AddCoins:
      return {
        ...state,
        coins: state.coins + (payload || 0)
      }
    default:
      return state;
  }
};

export default reducer;