import { Dispatch } from "redux";
import { batch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  IAction,
  ActionTypes,
  resetErrors,
  setErrorFields,
  setErrorMessage,
} from "@redux/actions";
import RouteUtils from "@utils/Route";
import AuthUtils from "@utils/Auth";
import Constants from "@utils/Constants";
import { RewardItem } from "@utils/interfaces";

export const setUser = (user: any) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.Login,
      payload: {
        user,
      },
    };

    dispatch(action);
  };
};

export const logoutUser = () => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.Logout,
    };
    AuthUtils.removeJwtToken();
    dispatch(action);
  };
};

export const loginUser = (username: string, password: string) => {
  return function (dispatch: Dispatch) {
    const route = RouteUtils.routes.api.auth.login;

    RouteUtils.sendApiRequest(route, {
      username,
      password,
    })
      .then((response) => {
        if (typeof response.data.token === "string") {
          const { token, ...rest } = response.data;

          AuthUtils.setJwtToken(token);
          AuthUtils.setAuthHeaderToken(token);

          batch(() => {
            setUser(jwtDecode(token))(dispatch);
            setCoinsAndRewards(rest)(dispatch);
            resetErrors()(dispatch);
          });
        }
      })
      .catch(handleLoginRegisterErrors(dispatch));
  };
};

export const setCoinsAndRewards = (data: {
  coins?: number;
  rewards?: any[];
}) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.SetCoinsAndRewards,
      payload: data,
    });
  };
};

export const registerUser = (data: any) => {
  return function (dispatch: Dispatch) {
    const route = RouteUtils.routes.api.auth.register;

    RouteUtils.sendApiRequest(route, data)
      .then((response) => {
        if (typeof response.data.username === "string") {
          resetErrors()(dispatch);
          window.location.href = RouteUtils.routes.app.auth.login.path;
        }
      })
      .catch(handleLoginRegisterErrors(dispatch));
  };
};

export const addCoins = (amount: number) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: ActionTypes.AddCoins,
      payload: amount,
    });
  };
};

export const setToken = (token: string) => {
  if (!token.startsWith(Constants.authTokenType)) {
    token = Constants.authTokenType + " " + token;
  }

  return function (dispatch: Dispatch) {
    AuthUtils.setJwtToken(token);
    AuthUtils.setAuthHeaderToken(token);

    const route = RouteUtils.routes.api.user.coinsAndRewards;

    RouteUtils.sendApiRequest(route)
      .then((res) => {
        if (res.data) {
          batch(() => {
            setUser(jwtDecode(token))(dispatch);
            setCoinsAndRewards(res.data)(dispatch);
          });
        }
      })
      .catch(() => {});
  };
};

export const updateReward = (reward: RewardItem) => {
  return function (dispatch: Dispatch) {
    batch(() => {
      dispatch({
        type: ActionTypes.UpdateReward,
        payload: reward,
      });
      addCoins(reward.reward)(dispatch);
    });
  };
};

function handleLoginRegisterErrors(dispatch: Dispatch) {
  return (err: any) => {
    if (!err.response) {
      setErrorMessage("Unexpected error")(dispatch);
      return;
    }

    const { data } = err.response;
    if (data.errors) {
      setErrorFields(data.errors)(dispatch);
    } else if (data.message) {
      setErrorMessage(data.message)(dispatch);
    }
  };
}
