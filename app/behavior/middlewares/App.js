import { APP_LOADED } from "../actions";
import { buildActionLocationsCatalogBrowserOpen } from "../actions";
import { buildActionWindowHashChanged } from "../actions/window";
import { getWindowHash } from "../../window";


export default function buildMiddlewareAppLoading() {
  return (store) => (next) => (action) => {
    if (action.type == APP_LOADED) {
      let hash = getWindowHash();
      if (hash) {
        store.dispatch(buildActionWindowHashChanged(hash));
      } else {
        store.dispatch(buildActionLocationsCatalogBrowserOpen());
      }
    }
    return next(action);
  }
}
