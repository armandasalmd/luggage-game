import { combineReducers } from "redux";

import actionBarReducer from "./actionBarReducer";
import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";
import lobbyReducer from "./lobbyReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  actionBar: actionBarReducer,
  error: errorReducer,
  game: gameReducer,
  lobby: lobbyReducer,
  user: userReducer, 
});

export default rootReducer;