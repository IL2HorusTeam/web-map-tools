import { combineReducers } from "redux";

import buildWindowReducer from "./window";
import buildWorkspaceReducer from "./Workspace";
import buildLocationsCatalogBrowserReducer from "./LocationsCatalogBrowser";


export default function buildReducer() {
  return combineReducers({
    window: buildWindowReducer(),
    locationsCatalogBrowser: buildLocationsCatalogBrowserReducer(),
    workspace: buildWorkspaceReducer(),
  });
}
