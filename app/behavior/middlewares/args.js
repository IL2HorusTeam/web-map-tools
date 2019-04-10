import { parseArgumentsString } from "../../args";
import { formatArgumentsString } from "../../args";

import { WINDOW_HASH_CHANGED } from "../actions/window";
import { buildLocationSelectedAction } from "../actions";
import { buildLocationsCatalogBrowserOpenAction } from "../actions";

import { InvalidLocationVariantId } from "../../errors";

import { selectLocationsCatalogBrowserIsOpen } from "../../state/selectors";
import { selectLocationVariantId } from "../../state/selectors";

import { getWindowHash } from "../../window";
import { maybeUpdateWindowHash } from "../../window";


export default function buildArgsMiddleware(locationVariantIdValidator) {
  return (store) => (next) => (action) => {
    if (action.type != WINDOW_HASH_CHANGED) {
      return next(action);
    }

    const currentHash = getWindowHash();
    const currentArgs = maybeParseArgs(currentHash);

    const newArgs = {
      locationVariantId: maybeGetAndValidateLocationVariantId(
        currentArgs,
        locationVariantIdValidator,
      ),
    };

    const currentState = store.getState();
    const currentLocationVariantId = selectLocationVariantId(currentState);

    if (newArgs.locationVariantId != currentLocationVariantId) {
      store.dispatch(buildLocationSelectedAction(newArgs.locationVariantId));
    }

    if (
         !newArgs.locationVariantId
      && !selectLocationsCatalogBrowserIsOpen(currentState)
    ) {
        store.dispatch(buildLocationsCatalogBrowserOpenAction());
    }

    if (currentHash && !newArgs.locationVariantId) {
      maybeUpdateWindowHash(formatArgumentsString(newArgs));
    }
  }
}


function maybeParseArgs(str) {
  if (str) {
    return parseArgumentsString(str);
  }
}


function maybeGetAndValidateLocationVariantId(args, validator) {
  const locationVariantId = (args && args.locationVariantId);

  if (locationVariantId) {
    try {
      validator(locationVariantId);
      return locationVariantId;
    } catch (InvalidLocationVariantId) {
      console.warn(
        `invalid locationVariantId in args: ${locationVariantId}`
      );
    }
  }
}
