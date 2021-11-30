import { IAction, ActionTypes } from "@redux/actions";

export interface IAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

const reducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.Login:
      state.isAuthenticated = true;
      return { ...state };
    case ActionTypes.Logout:
      state.isAuthenticated = false;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;