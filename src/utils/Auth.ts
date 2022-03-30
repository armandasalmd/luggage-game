import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import store from "@redux/store";
import Constants from "@utils/Constants";
import RouteUtils from "@utils/Route";
import { setToken, logoutUser } from "@redux/actions";

function applyUnauthorisedMiddleware() {
  axios.interceptors.response.use((response: any) => response, (error) => {
    if (error?.response?.status === 401 ?? false) {
      removeJwtToken();
      window.location.reload();
    }

    return Promise.reject(error);
  });
}

function setAuthHeaderToken(token: string) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

function resetAuthTokenFromStorage() {
  const token = getJwtToken();

  if (token) {
    if (
      typeof token === "string" &&
      token.startsWith(Constants.authTokenType)
    ) {
      let decoded: JwtPayload | undefined;
      try {
        decoded = jwtDecode(token);
      } catch (err) {
        decoded = undefined;
      }
      const currentTime = Date.now() / 1000;

      if (decoded && (decoded.exp || 0) > currentTime) {
        setAuthHeaderToken(token);
        setToken(token)(store.dispatch);
        
        return;
      }
    }

    logoutUser()(store.dispatch);
    window.location.href = RouteUtils.routes.app.auth.login.path;
  }
}

function getJwtToken(): string {
  return localStorage.jwtToken;
}

function getPlainJwtToken() {
  return getJwtToken().replace(Constants.authTokenType + " ", "");
}

function setJwtToken(token: string) {
  localStorage.setItem("jwtToken", token);
}

function removeJwtToken() {
  localStorage.removeItem("jwtToken");
}

const items = {
  applyUnauthorisedMiddleware,
  getJwtToken,
  getPlainJwtToken,
  setJwtToken,
  removeJwtToken,
  resetAuthTokenFromStorage,
  setAuthHeaderToken,
};

export default items; 
