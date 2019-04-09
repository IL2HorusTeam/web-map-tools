import { APP_LOADED } from "../actions";
import { buildLocationsCatalogBrowserOpenAction } from "../actions";
import { buildWindowHashChangedAction } from "../actions/window";
import { getWindowHash } from "../../window";


export default function buildMiddlewareAppLoading() {
  return (store) => (next) => (action) => {
    if (action.type == APP_LOADED) {
      let hash = getWindowHash();
      if (hash) {
        store.dispatch(buildWindowHashChangedAction(hash));
      } else {
        store.dispatch(buildLocationsCatalogBrowserOpenAction());
      }
    }
    return next(action);
  }
}
