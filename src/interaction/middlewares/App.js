import { APP_LOADED } from "../actions";
import { makeActionLocationsCatalogBrowserOpen } from "../actions";
import { makeActionWindowHashChanged } from "../actions/window";
import { getWindowHash } from "../../window";


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
