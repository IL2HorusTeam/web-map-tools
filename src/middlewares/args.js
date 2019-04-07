import { WINDOW_HASH_CHANGED } from "../actions/window";
import { makeActionLocationSelected } from "../actions/Workspace";
import { makeActionLocationsCatalogBrowserOpen } from "../actions/LocationsCatalogBrowser";
import { getWindowHash } from "../utils/window";
import { parseArgumentsString } from "../utils/args";
import { InvalidLocationVariantId } from "../errors/Workspace";


export default function makeMiddlewareArgs(validateLocationVariantId) {
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
      store.dispatch(makeActionLocationSelected(locationVariantId));
    }

    if (!locationVariantId && !state.locationsCatalogBrowser.isOpen) {
      store.dispatch(makeActionLocationsCatalogBrowserOpen());
    }
  }
}
