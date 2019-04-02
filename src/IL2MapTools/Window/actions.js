import { createAction } from "redux-actions";

import { WINDOW_SIZE_CHANGED } from "./types";
import { WINDOW_SIZE_CHANGED_ACK } from "./types";


export const makeActionWindowSizeChanged = createAction(
  WINDOW_SIZE_CHANGED,
  (width, height) => {
    return {
      width:  width,
      height: height,
    };
  },
);


export const makeActionWindowSizeChangedAck = createAction(
  WINDOW_SIZE_CHANGED_ACK,
  (width, height) => {
    return {
      width:  width,
      height: height,
    };
  },
);
