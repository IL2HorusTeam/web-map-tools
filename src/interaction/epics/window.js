import { fromEvent } from 'rxjs';

import { debounceTime } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";
import { ignoreElements } from "rxjs/operators";
import { map } from "rxjs/operators";
import { skip } from "rxjs/operators";

import { combineEpics } from 'redux-observable';

import { makeActionWindowSizeChanged } from "../../interaction/actions/window";
import { makeActionWindowHashChanged } from "../../interaction/actions/window";

import { formatArgumentsString } from "../../args";
import { getWindowHash } from "../../window";
import { maybeUpdateWindowHash } from "../../window";
import { selectArguments } from "../../state/selectors";


function makeWindowResizeListener() {
  return function windowResizeListener() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(500),
      map((event) => makeActionWindowSizeChanged(
        event.target.innerWidth,
        event.target.innerHeight,
      )),
    );
  };
}


function makeWindowHashUpdatesListener() {
  return function windowHashUpdatesListener() {
    return fromEvent(window, 'hashchange').pipe(
      map(() => makeActionWindowHashChanged(getWindowHash())),
    );
  };
}


function makeWindowHashUpdater() {
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


export default function makeEpicWindow() {
  return combineEpics(
    makeWindowResizeListener(),
    makeWindowHashUpdatesListener(),
    makeWindowHashUpdater(),
  );
}
