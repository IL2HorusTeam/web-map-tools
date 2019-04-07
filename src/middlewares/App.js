import { APP_LOADED } from "../actions/App";
import { makeActionWindowHashChanged } from "../actions/window";
import { makeActionLocationsCatalogBrowserOpen } from "../actions/LocationsCatalogBrowser";
import { getWindowHash } from "../utils/window";


export default function makeMiddlewareAppLoading() {
  return (store) => (next) => (action) => {
    if (action.type == APP_LOADED) {
      let hash = getWindowHash();
      if (hash) {
        store.dispatch(makeActionWindowHashChanged(hash));
      } else {
        store.dispatch(makeActionLocationsCatalogBrowserOpen());
      }
    }
    return next(action);
  }
}
