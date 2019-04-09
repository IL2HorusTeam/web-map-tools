import { handleActions } from "redux-actions";

import produce from "immer";

import { LOCATION_SELECTED } from "../../behavior/actions";


const initialState = {
  locationVariantId: undefined,
};


function buildReducerWorkspace() {
  const handlersMap = {
    [LOCATION_SELECTED]: produce((draft, action) => {
      draft.locationVariantId = action.payload.locationVariantId;
    }),
  };
  return handleActions(handlersMap, initialState);
}


export default buildReducerWorkspace;
