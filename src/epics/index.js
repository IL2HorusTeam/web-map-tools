import { combineEpics } from "redux-observable";

import makeEpicWindow from "./window";
import makeEpicKeyboard from "./keyboard";
import makeEpicLocationsCatalogBrowser from "./LocationsCatalogBrowser";


export default function makeEpic() {
  return combineEpics(
    makeEpicWindow(),
    makeEpicKeyboard(),
    makeEpicLocationsCatalogBrowser(),
  );
}
