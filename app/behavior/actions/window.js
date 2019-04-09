import { createAction } from "redux-actions";

export const WINDOW_SIZE_CHANGED = "window/size/changed";
export const WINDOW_HASH_CHANGED = "window/hash/changed";


export const buildActionWindowSizeChanged = createAction(
  WINDOW_SIZE_CHANGED,
  (width, height) => ({width: width, height: height}),
);


export const buildActionWindowHashChanged = createAction(
  WINDOW_HASH_CHANGED,
  (hash) => ({hash: hash}),
);
