import { makeActionWindowSizeChanged } from "./actions";
import store from "IL2MapTools/store";


export function makeListenerWindowSizeChanged(dispatch) {
  return () => {
    dispatch(makeActionWindowSizeChanged(
      window.innerWidth,
      window.innerHeight,
    ));
  };
}
