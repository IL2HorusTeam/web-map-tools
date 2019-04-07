import { createAction } from "redux-actions";

export const LOCATION_SELECTED = "location/selected";


export const makeActionLocationSelected = createAction(
  LOCATION_SELECTED,
  (locationVariantId) => ({locationVariantId: locationVariantId}),
);
