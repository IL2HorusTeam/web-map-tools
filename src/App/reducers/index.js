import { combineReducers } from "redux";

import appStateReducer from "./appState";
import windowReducer from "./window";


var rootReducer = combineReducers({
  state:  appStateReducer,
  window: windowReducer,
});


export default rootReducer;
