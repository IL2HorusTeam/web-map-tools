import { createAction } from "redux-actions";

import { APPLICATION_LOADED } from "./types";

import { LOCATION_VARIANT_SELECTED } from "./types";
import { LOCATION_VARIANT_SELECTED_ACK } from "./types";
import { LOCATION_VARIANT_SELECTED_REJECT } from "./types";


export const makeActionApplicationLoaded = createAction(APPLICATION_LOADED);


export const makeActionLocationVariantSelected = createAction(
  LOCATION_VARIANT_SELECTED,
  (locationVariantId) => {
    return {
      id: locationVariantId,
    };
  },
);


export const makeActionLocationVariantSelectedAck = createAction(
  LOCATION_VARIANT_SELECTED_ACK,
  (locationVariantId) => {
    return {
      id: locationVariantId,
    };
  },
);


export const makeActionLocationVariantSelectedReject = createAction(
  LOCATION_VARIANT_SELECTED_REJECT,
);
