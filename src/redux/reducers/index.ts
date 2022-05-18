import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";
import lobbyReducer from "./lobbyReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  game: gameReducer,
  lobby: lobbyReducer,
  user: userReducer, 
});

export default rootReducer;