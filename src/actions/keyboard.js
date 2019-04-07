import { createAction } from "redux-actions";

export const KEY_DOWN = "key/down";


const makeActionKeyDown = createAction(
  KEY_DOWN,
  (keyCode) => ({keyCode: keyCode}),
);


export default makeActionKeyDown;
