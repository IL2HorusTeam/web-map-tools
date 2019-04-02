import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { loggerMiddleware } from "./middlewares";
import rootReducer from "./reducers";


const epicMiddleware = createEpicMiddleware();


export function configureStore(rootEpic) {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      loggerMiddleware,
      epicMiddleware,
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
