import { fromEvent } from 'rxjs';

import { auditTime } from "rxjs/operators";
import { map } from "rxjs/operators";

import makeActionKeyDown from "../actions/keyboard";


export default function makeEpicKeyboard() {
  return function keyboardEpic() {
    return fromEvent(window, 'keydown').pipe(
      auditTime(125),
      map((event) => {
        return makeActionKeyDown(event.keyCode);
      }),
    );
  };
}
  
