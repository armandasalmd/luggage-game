import { combineReducers } from "redux";

import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import lobbyReducer from "./lobbyReducer";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  lobby: lobbyReducer,
  game: gameReducer
});

export default rootReducer;