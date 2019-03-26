import produce from "immer";
import { handleActions } from 'redux-actions';

import { WINDOW_RESIZE } from "../constants/actionTypes";


const initialState = {
  width:  window.innerWidth,
  height: window.innerHeight,
};


const windowReducer = handleActions({
  [WINDOW_RESIZE]: produce((draft, action) => {
    draft.width  = action.payload.width;
    draft.height = action.payload.height;
  }),
}, initialState);


export default windowReducer;
