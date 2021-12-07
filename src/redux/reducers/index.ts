import { combineReducers } from "redux";

import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import lobbyReducer from "./lobbyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  lobby: lobbyReducer
});

export default rootReducer;