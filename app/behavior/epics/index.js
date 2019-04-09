import { combineEpics } from "redux-observable";

import buildWindowEpic from "./window";
import buildKeyboardEpic from "./keyboard";
import buildLocationsCatalogBrowserEpic from "./LocationsCatalogBrowser";


export default function buildEpic() {
  return combineEpics(
    buildWindowEpic(),
    buildKeyboardEpic(),
    buildLocationsCatalogBrowserEpic(),
  );
}
