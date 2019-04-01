import { combineReducers } from "redux";

import { APPLICATION_STATES } from "./types";

const initialAppState = APPLICATION_STATES.LOADING;


function appStateReducer(state = initialAppState, action) {
  return state;
}


const appReducer = combineReducers({
  state: appStateReducer,
});


export default appReducer;
