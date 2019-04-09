import { fromEvent } from 'rxjs';

import { auditTime } from "rxjs/operators";
import { map } from "rxjs/operators";

import buildActionKeyDown from "../actions/keyboard";


export default function buildEpicKeyboard() {
  return function keyboardEpic() {
    return fromEvent(window, 'keydown').pipe(
      auditTime(125),
      map((event) => {
        return buildActionKeyDown(event.keyCode);
      }),
    );
  };
}
  
