import { createAction } from "redux-actions";

export const KEY_DOWN = "key/down";


const buildKeyDownAction = createAction(
  KEY_DOWN,
  (keyCode) => ({keyCode: keyCode}),
);


export default buildKeyDownAction;
