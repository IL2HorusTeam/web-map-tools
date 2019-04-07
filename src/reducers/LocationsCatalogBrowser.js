import { handleActions } from "redux-actions";

import produce from "immer";

import { LOCATIONS_CATALOG_BROWSER_OPEN } from "../actions/LocationsCatalogBrowser";
import { LOCATIONS_CATALOG_BROWSER_CLOSE } from "../actions/LocationsCatalogBrowser";


const initialState = {
  isOpen: false,
};


function makeReducerLocationsCatalogBrowser() {
  const handlersMap = {
    [LOCATIONS_CATALOG_BROWSER_OPEN]: produce((draft, action) => {
      draft.isOpen = true;
    }),
    [LOCATIONS_CATALOG_BROWSER_CLOSE]: produce((draft, action) => {
      draft.isOpen = false;
    }),
  };
  return handleActions(handlersMap, initialState);
}


export default makeReducerLocationsCatalogBrowser;
