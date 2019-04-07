import { createAction } from "redux-actions";

export const LOCATIONS_CATALOG_BROWSER_OPEN  = "LocationsCatalogBrowser/open";
export const LOCATIONS_CATALOG_BROWSER_CLOSE = "LocationsCatalogBrowser/close";

export const makeActionLocationsCatalogBrowserOpen  = createAction(
  LOCATIONS_CATALOG_BROWSER_OPEN,
);

export const makeActionLocationsCatalogBrowserClose = createAction(
  LOCATIONS_CATALOG_BROWSER_CLOSE,
);
