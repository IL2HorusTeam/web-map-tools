import { handleActions } from "redux-actions";

import produce from "immer";

import { LOCATION_SELECTED } from "../../interaction/actions";


const initialState = {
  locationVariantId: undefined,
};


function makeReducerWorkspace() {
  const handlersMap = {
    [LOCATION_SELECTED]: produce((draft, action) => {
      draft.locationVariantId = action.payload.locationVariantId;
    }),
  };
  return handleActions(handlersMap, initialState);
}


export default makeReducerWorkspace;
