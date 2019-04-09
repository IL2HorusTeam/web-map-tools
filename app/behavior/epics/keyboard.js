import { fromEvent } from 'rxjs';

import { auditTime } from "rxjs/operators";
import { map } from "rxjs/operators";

import buildKeyDownAction from "../actions/keyboard";


export default function buildEpicKeyboard() {
  return function keyboardEpic() {
    return fromEvent(window, 'keydown').pipe(
      auditTime(125),
      map((event) => {
        return buildKeyDownAction(event.keyCode);
      }),
    );
  };
}
  
