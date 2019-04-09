import { fromEvent } from 'rxjs';

import { debounceTime } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";
import { ignoreElements } from "rxjs/operators";
import { map } from "rxjs/operators";
import { skip } from "rxjs/operators";

import { combineEpics } from 'redux-observable';

import { buildActionWindowSizeChanged } from "../../behavior/actions/window";
import { buildActionWindowHashChanged } from "../../behavior/actions/window";

import { formatArgumentsString } from "../../args";
import { getWindowHash } from "../../window";
import { maybeUpdateWindowHash } from "../../window";
import { selectArguments } from "../../state/selectors";


function buildWindowResizeListener() {
  return function windowResizeListener() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(500),
      map((event) => buildActionWindowSizeChanged(
        event.target.innerWidth,
        event.target.innerHeight,
      )),
    );
  };
}


function buildWindowHashUpdatesListener() {
  return function windowHashUpdatesListener() {
    return fromEvent(window, 'hashchange').pipe(
      map(() => buildActionWindowHashChanged(getWindowHash())),
    );
  };
}


function buildWindowHashUpdater() {
  return function windowHashUpdater(actionStream, stateStream) {
    return stateStream.pipe(
      skip(1), // skip initial state, TODO: refactor, this is ugly
      map(state => formatArgumentsString(selectArguments(state))),
      distinctUntilChanged(),
      map(str => maybeUpdateWindowHash(str)),
      ignoreElements(),
    );
  };
}


export default function buildEpicWindow() {
  return combineEpics(
    buildWindowResizeListener(),
    buildWindowHashUpdatesListener(),
    buildWindowHashUpdater(),
  );
}
