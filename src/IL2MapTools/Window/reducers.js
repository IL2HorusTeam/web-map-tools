import { handleActions } from "redux-actions";

import produce from "immer";

import { WINDOW_SIZE_CHANGED_ACK } from "./types";


const initialState = {
  width:  window.innerWidth,
  height: window.innerHeight,
};


const windowReducer = handleActions({
  WINDOW_SIZE_CHANGED_ACK: produce((draft, action) => {
    draft.width  = action.payload.width;
    draft.height = action.payload.height;
  }),
}, initialState);


export default windowReducer;
