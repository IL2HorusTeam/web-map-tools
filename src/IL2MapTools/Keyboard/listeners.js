import { makeActionEscapeKeyPressed } from "./actions";
import { ESCAPE_KEY_CODE } from "./constants";


export function makeListenerKeyboardKeyPressed(dispatch) {
  return (event) => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      dispatch(makeActionEscapeKeyPressed());
      event.preventDefault();
    }
  };
}
