import { combineEpics } from 'redux-observable';
import { ofType } from "redux-observable";

import { asyncScheduler } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { observeOn } from 'rxjs/operators';

import { makeActionLocationVariantSelectedAck } from "./actions";
import { makeActionLocationVariantSelectedReject } from "./actions";
import { makeLocationVariantIdValidator } from "./validators";
import { LOCATION_VARIANT_SELECTED } from "./types";


function makeLocationVariantSelectionEpic(locationVariants) {
  const locationVariantsIds = locationVariants.map(variant => variant.id);
  const validate = makeLocationVariantIdValidator(locationVariantsIds);

  return function locationVariantSelectionEpic(actionStream) {
    return actionStream.pipe(
      ofType(LOCATION_VARIANT_SELECTED),
      map(action => {
        validate(action.payload.id);
        return makeActionLocationVariantSelectedAck(action.payload.id);
      }),
      catchError((error, stream) => stream.pipe(startWith(
        makeActionLocationVariantSelectedReject(error),
      ))),
      observeOn(asyncScheduler),
    );
  };
}


export default function makeAppEpic(locationVariants) {
  return combineEpics(
    makeLocationVariantSelectionEpic(locationVariants),
  );
}
