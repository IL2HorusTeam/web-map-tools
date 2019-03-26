import { createAction } from "redux-actions";

import { WINDOW_RESIZE } from "../constants/actionTypes";


function createWindowResizePayload(width, height) {
  return {
    width:  width,
    height: height,
  }
};


export const windowResize = createAction(
  WINDOW_RESIZE,
  createWindowResizePayload,
);
