import { createAction } from "redux-actions";

export const APP_LOADED = "app/loaded";

export const makeActionAppLoaded = createAction(APP_LOADED);
