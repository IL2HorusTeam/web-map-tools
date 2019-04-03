import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import produce from "immer";

import { APPLICATION_STATES } from "./types";
import { LOCATION_VARIANT_SELECTED_ACK } from "./types";


const initialAppState = {
  state:             APPLICATION_STATES.LOADING,
  locationVariantId: undefined,
};


const appReducer = handleActions({
  LOCATION_VARIANT_SELECTED_ACK: produce((draft, action) => {
    draft.state = APPLICATION_STATES.USING_MAP;
    draft.locationVariantId = action.payload.id;
  }),
}, initialAppState);


export default appReducer;
