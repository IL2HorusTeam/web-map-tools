import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import produce from "immer";

import { OPEN_LOCATIONS_BROWSER } from "./Workspace/InstrumentPanel/OpenLocationsBrowserButton/types";

import { APPLICATION_LOADED } from "./types";
import { APPLICATION_STATES } from "./types";
import { CLOSE_LOCATIONS_BROWSER } from "./types";
import { LOCATION_VARIANT_SELECTED_ACK } from "./types";

import { maybeGetArgsFromAddress } from "./utils";


const initialAppState = {
  state:             APPLICATION_STATES.LOADING,
  locationVariantId: undefined,
};


const appReducer = handleActions({
  APPLICATION_LOADED: produce((draft, action) => {
    let args = maybeGetArgsFromAddress();
    if (args) {
      // TODO:
    }
    draft.state = APPLICATION_STATES.SELECTING_LOCATIONS;
  }),
  LOCATION_VARIANT_SELECTED_ACK: produce((draft, action) => {
    draft.state = APPLICATION_STATES.USING_MAP;
    draft.locationVariantId = action.payload.id;
  }),
  OPEN_LOCATIONS_BROWSER: produce((draft, action) => {
    draft.state = APPLICATION_STATES.BROWSING_LOCATIONS;
  }),
  CLOSE_LOCATIONS_BROWSER: produce((draft, action) => {
    draft.state = APPLICATION_STATES.USING_MAP;
  }),
}, initialAppState);


export default appReducer;
