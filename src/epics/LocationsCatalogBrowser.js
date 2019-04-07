import { combineEpics } from "redux-observable";
import { ofType } from "redux-observable";

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { withLatestFrom } from 'rxjs/operators';

import { makeActionLocationsCatalogBrowserClose } from "../actions/LocationsCatalogBrowser";
import { KEY_DOWN } from "../actions/keyboard";
import { KEY_CODE_ESCAPE } from "../constants/keyboard";
import { LOCATION_SELECTED } from "../actions/Workspace";
import { selectIsLocationsCatalogBrowserClosable } from "../selectors";
import { selectIsLocationsCatalogBrowserOpen } from "../selectors";


function makeEpicCloseOnEscapeKey() {
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
      map(() => makeActionLocationsCatalogBrowserClose()),
    );
  }
}


function makeEpicCloseOnLocationSelected() {
  return function locationsCatalogBrowserCloseOnLocationSelectedEpic(
    actionStream,
    stateStream,
  ) {
    return actionStream.pipe(
      ofType(LOCATION_SELECTED),
      withLatestFrom(stateStream),
      filter(([, state]) => selectIsLocationsCatalogBrowserOpen(state)),
      map(() => makeActionLocationsCatalogBrowserClose()),
    );
  }
}


export default function makeEpicLocationsCatalogBrowser() {
  return combineEpics(
    makeEpicCloseOnEscapeKey(),
    makeEpicCloseOnLocationSelected(),
  );
}
