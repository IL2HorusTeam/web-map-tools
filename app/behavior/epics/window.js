import { combineEpics } from 'redux-observable';
import { ofType } from "redux-observable";

import { fromEvent } from 'rxjs';

import { debounceTime } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";
import { ignoreElements } from "rxjs/operators";
import { map } from "rxjs/operators";
import { skipUntil } from "rxjs/operators";

import { APP_LOADED } from "../../behavior/actions";
import { buildWindowSizeChangedAction } from "../../behavior/actions/window";
import { buildWindowHashChangedAction } from "../../behavior/actions/window";

import { formatArgumentsString } from "../../args";
import { getWindowHash } from "../../window";
import { maybeUpdateWindowHash } from "../../window";
import { selectArguments } from "../../state/selectors";


function buildWindowResizeListener() {
  return function windowResizeListener() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(500),
      map((event) => buildWindowSizeChangedAction(
        event.target.innerWidth,
        event.target.innerHeight,
      )),
    );
  };
}


function buildWindowHashUpdatesListener() {
  return function windowHashUpdatesListener() {
    return fromEvent(window, 'hashchange').pipe(
      map(() => buildWindowHashChangedAction(getWindowHash())),
    );
  };
}


function buildWindowHashUpdater() {
  return function windowHashUpdater(actionStream, stateStream) {
    return stateStream.pipe(
      skipUntil(actionStream.pipe(
        ofType(APP_LOADED),
      )),
      map(state => formatArgumentsString(selectArguments(state))),
      distinctUntilChanged(),
      map(str => maybeUpdateWindowHash(str)),
      ignoreElements(),
    );
  };
}


export default function buildWindowEpic() {
  return combineEpics(
    buildWindowResizeListener(),
    buildWindowHashUpdatesListener(),
    buildWindowHashUpdater(),
  );
}
