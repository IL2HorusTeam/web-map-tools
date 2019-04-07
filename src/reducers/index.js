import { combineReducers } from "redux";

import makeReducerWindow from "./window";
import makeReducerWorkspace from "./Workspace";
import makeReducerLocationsCatalogBrowser from "./LocationsCatalogBrowser";


export default function makeReducer() {
  return combineReducers({
    window: makeReducerWindow(),
    locationsCatalogBrowser: makeReducerLocationsCatalogBrowser(),
    workspace: makeReducerWorkspace(),
  });
}
