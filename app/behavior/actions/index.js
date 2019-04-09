import { createAction } from "redux-actions";

export const APP_LOADED = "app/loaded";

export const LOCATIONS_CATALOG_BROWSER_OPEN  = "LocationsCatalogBrowser/open";
export const LOCATIONS_CATALOG_BROWSER_CLOSE = "LocationsCatalogBrowser/close";

export const LOCATION_SELECTED = "location/selected";


export const buildAppLoadedAction = createAction(APP_LOADED);


export const buildLocationsCatalogBrowserOpenAction  = createAction(
  LOCATIONS_CATALOG_BROWSER_OPEN,
);
export const buildLocationsCatalogBrowserCloseAction = createAction(
  LOCATIONS_CATALOG_BROWSER_CLOSE,
);


export const buildLocationSelectedAction = createAction(
  LOCATION_SELECTED,
  (locationVariantId) => ({locationVariantId: locationVariantId}),
);
