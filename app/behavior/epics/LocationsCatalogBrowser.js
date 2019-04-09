import { combineEpics } from "redux-observable";
import { ofType } from "redux-observable";

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { withLatestFrom } from 'rxjs/operators';

import { buildLocationsCatalogBrowserCloseAction } from "../actions";
import { KEY_DOWN } from "../actions/keyboard";
import { KEY_CODE_ESCAPE } from "../../constants";
import { LOCATION_SELECTED } from "../actions";
import { selectLocationsCatalogBrowserIsClosable } from "../../state/selectors";
import { selectLocationsCatalogBrowserIsOpen } from "../../state/selectors";


function buildCloseOnEscapeKeyEpic() {
  return function locationsCatalogBrowserCloseOnEscapeKeyEpic(
    actionStream,
    stateStream,
  ) {
    return actionStream.pipe(
      ofType(KEY_DOWN),
      filter(action => (action.payload.keyCode === KEY_CODE_ESCAPE)),
      withLatestFrom(stateStream),
      filter(([, state]) => selectLocationsCatalogBrowserIsOpen(state)),
      filter(([, state]) => selectLocationsCatalogBrowserIsClosable(state)),
      map(() => buildLocationsCatalogBrowserCloseAction()),
    );
  }
}


function buildCloseOnLocationSelectedEpic() {
  return function locationsCatalogBrowserCloseOnLocationSelectedEpic(
    actionStream,
    stateStream,
  ) {
    return actionStream.pipe(
      ofType(LOCATION_SELECTED),
      withLatestFrom(stateStream),
      filter(([, state]) => selectLocationsCatalogBrowserIsOpen(state)),
      map(() => buildLocationsCatalogBrowserCloseAction()),
    );
  }
}


export default function buildLocationsCatalogBrowserEpic() {
  return combineEpics(
    buildCloseOnEscapeKeyEpic(),
    buildCloseOnLocationSelectedEpic(),
  );
}
