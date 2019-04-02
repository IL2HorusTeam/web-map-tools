import { combineEpics } from 'redux-observable';

import makeAppEpic from "./App/epics";
import makeWindowEpic from "./Window/epics";


export function makeRootEpic(locationVariants) {
  return combineEpics(
    makeAppEpic(locationVariants),
    makeWindowEpic(),
  );
}
