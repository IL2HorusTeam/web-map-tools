import { handleActions } from "redux-actions";

import produce from "immer";

import { WINDOW_SIZE_CHANGED } from "../../actions/window";


const initialState = {
  width:  window.innerWidth,
  height: window.innerHeight,
};


function makeReducerWindow() {
  const handlersMap = {
    [WINDOW_SIZE_CHANGED]: produce((draft, action) => {
      draft.width  = action.payload.width;
      draft.height = action.payload.height;
    }),
  };
  return handleActions(handlersMap, initialState);
}


export default makeReducerWindow;
