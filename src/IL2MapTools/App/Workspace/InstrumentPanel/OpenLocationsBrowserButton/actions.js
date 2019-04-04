import { createAction } from "redux-actions";

import { OPEN_LOCATIONS_BROWSER } from "./types";


export const makeActionOpenLocationsBrowser = createAction(
  OPEN_LOCATIONS_BROWSER,
);
