import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import store from "@redux/store";
import Constants from "@utils/Constants";
import RouteUtils from "@utils/Route";
import { setUser, logoutUser } from "@redux/actions";

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
        
        RouteUtils.sendApiRequest(RouteUtils.routes.api.user.coins).then((res) => {
          setUser(decoded, res.data)(store.dispatch);
        });
        return;
      }
    }

    logoutUser()(store.dispatch);
    window.location.href = RouteUtils.routes.app.auth.login.path;
  }
}

function getJwtToken() {
  return localStorage.jwtToken;
}

function setJwtToken(token: string) {
  localStorage.setItem("jwtToken", token);
}

function removeJwtToken() {
  localStorage.removeItem("jwtToken");
}

const items = {
  getJwtToken,
  setJwtToken,
  removeJwtToken,
  resetAuthTokenFromStorage,
  setAuthHeaderToken,
};

export default items; 
