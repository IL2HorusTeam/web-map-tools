import { combineEpics } from 'redux-observable';

import windowEpic from "./Window/epics";


const rootEpic = combineEpics(
  windowEpic,
);


export default rootEpic;
