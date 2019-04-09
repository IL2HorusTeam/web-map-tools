import { createAction } from "redux-actions";

export const KEY_DOWN = "key/down";


const buildActionKeyDown = createAction(
  KEY_DOWN,
  (keyCode) => ({keyCode: keyCode}),
);


export default buildActionKeyDown;
