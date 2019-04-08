import { createAction } from "redux-actions";

export const APP_LOADED = "app/loaded";

export const LOCATIONS_CATALOG_BROWSER_OPEN  = "LocationsCatalogBrowser/open";
export const LOCATIONS_CATALOG_BROWSER_CLOSE = "LocationsCatalogBrowser/close";

export const LOCATION_SELECTED = "location/selected";


export const makeActionAppLoaded = createAction(APP_LOADED);


export const makeActionLocationsCatalogBrowserOpen  = createAction(
  LOCATIONS_CATALOG_BROWSER_OPEN,
);
export const makeActionLocationsCatalogBrowserClose = createAction(
  LOCATIONS_CATALOG_BROWSER_CLOSE,
);


export const makeActionLocationSelected = createAction(
  LOCATION_SELECTED,
  (locationVariantId) => ({locationVariantId: locationVariantId}),
);
