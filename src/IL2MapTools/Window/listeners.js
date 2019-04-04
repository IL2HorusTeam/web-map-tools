import { makeActionWindowSizeChanged } from "./actions";


export function makeListenerWindowSizeChanged(dispatch) {
  return () => {
    dispatch(makeActionWindowSizeChanged(
      window.innerWidth,
      window.innerHeight,
    ));
  };
}
