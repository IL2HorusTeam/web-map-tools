import { createAction } from "redux-actions";

import { ESCAPE_KEY_PRESSED } from "./types";


export const makeActionEscapeKeyPressed = createAction(ESCAPE_KEY_PRESSED);
