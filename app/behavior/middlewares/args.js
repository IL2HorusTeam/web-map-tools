import { WINDOW_HASH_CHANGED } from "../actions/window";
import { buildLocationSelectedAction } from "../actions";
import { buildLocationsCatalogBrowserOpenAction } from "../actions";
import { getWindowHash } from "../../window";
import { parseArgumentsString } from "../../args";
import { InvalidLocationVariantId } from "../../errors";


export default function buildMiddlewareArgs(validateLocationVariantId) {
  return (store) => (next) => (action) => {
    if (action.type != WINDOW_HASH_CHANGED) {
      return next(action);
    }

    let hash = getWindowHash();
    let locationVariantId;

    if (hash) {
      let args = parseArgumentsString(hash);
      if (args.locationVariantId) {
        try {
          validateLocationVariantId(args.locationVariantId);
          locationVariantId = args.locationVariantId;
        } catch (InvalidLocationVariantId) {
          console.warn(
            `invalid locationVariantId in window hash: ${args.locationVariantId}`
          );
        }
      }
    }

    let state = store.getState();

    if (locationVariantId != state.workspace.locationVariantId) {
      store.dispatch(buildLocationSelectedAction(locationVariantId));
    }

    if (!locationVariantId && !state.locationsCatalogBrowser.isOpen) {
      store.dispatch(buildLocationsCatalogBrowserOpenAction());
    }
  }
}
