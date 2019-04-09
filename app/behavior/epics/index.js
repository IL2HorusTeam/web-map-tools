import { combineEpics } from "redux-observable";

import buildEpicWindow from "./window";
import buildEpicKeyboard from "./keyboard";
import buildEpicLocationsCatalogBrowser from "./LocationsCatalogBrowser";


export default function buildEpic() {
  return combineEpics(
    buildEpicWindow(),
    buildEpicKeyboard(),
    buildEpicLocationsCatalogBrowser(),
  );
}
