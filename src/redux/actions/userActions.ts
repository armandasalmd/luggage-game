import { Dispatch } from "redux";
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

export const setUser = (user: any, coins: number) => {
  return function (dispatch: Dispatch) {
    const action: IAction = {
      type: ActionTypes.Login,
      payload: {
        user,
        coins,
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

export const loginUser = (email: string, password: string) => {
  return function (dispatch: Dispatch) {
    const route = RouteUtils.routes.api.auth.login;

    RouteUtils.sendApiRequest(route, {
      email,
      password,
    })
      .then((response) => {
        if (typeof response.data.token === "string") {
          AuthUtils.setJwtToken(response.data.token);
          AuthUtils.setAuthHeaderToken(response.data.token);
          setUser(
            jwtDecode(response.data.token),
            response.data.coins
          )(dispatch);
          resetErrors()(dispatch);
        }
      })
      .catch(handleLoginRegisterErrors(dispatch));
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
  }
}