import { combineReducers } from "redux";

import appReducer from "./App/reducers";
import windowReducer from "./Window/reducers";


var rootReducer = combineReducers({
  window: windowReducer,
  app:    appReducer,
});


export default rootReducer;
