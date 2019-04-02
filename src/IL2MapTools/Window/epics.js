import { ofType } from "redux-observable";
import { debounceTime, map} from "rxjs/operators";

import { makeActionWindowSizeChangedAck } from "./actions";
import { WINDOW_SIZE_CHANGED } from "./types";


export default function makeWindowEpic() {
  return function windowEpic(actionStream) {
    return actionStream.pipe(
      ofType(WINDOW_SIZE_CHANGED),
      debounceTime(500),
      map((action) => makeActionWindowSizeChangedAck(
        action.payload.width,
        action.payload.height,
      )),
    );
  };
}
