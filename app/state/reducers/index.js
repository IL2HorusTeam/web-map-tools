import { combineReducers } from "redux";

import buildReducerWindow from "./window";
import buildReducerWorkspace from "./Workspace";
import buildReducerLocationsCatalogBrowser from "./LocationsCatalogBrowser";


export default function buildReducer() {
  return combineReducers({
    window: buildReducerWindow(),
    locationsCatalogBrowser: buildReducerLocationsCatalogBrowser(),
    workspace: buildReducerWorkspace(),
  });
}
