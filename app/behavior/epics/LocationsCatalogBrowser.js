import { combineEpics } from "redux-observable";
import { ofType } from "redux-observable";

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { withLatestFrom } from 'rxjs/operators';

import { buildLocationsCatalogBrowserCloseAction } from "../actions";
import { KEY_DOWN } from "../actions/keyboard";
import { KEY_CODE_ESCAPE } from "../../constants";
import { LOCATION_SELECTED } from "../actions";
import { selectIsLocationsCatalogBrowserClosable } from "../../state/selectors";
import { selectIsLocationsCatalogBrowserOpen } from "../../state/selectors";


function buildCloseOnEscapeKeyEpic() {
  return function locationsCatalogBrowserCloseOnEscapeKeyEpic(
    actionStream,
    stateStream,
  ) {
    return actionStream.pipe(
      ofType(KEY_DOWN),
      filter(action => (action.payload.keyCode === KEY_CODE_ESCAPE)),
      withLatestFrom(stateStream),
      filter(([, state]) => selectIsLocationsCatalogBrowserOpen(state)),
      filter(([, state]) => selectIsLocationsCatalogBrowserClosable(state)),
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
      filter(([, state]) => selectIsLocationsCatalogBrowserOpen(state)),
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
