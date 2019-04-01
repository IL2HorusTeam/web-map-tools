import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { loggerMiddleware } from "./middlewares";
import rootEpic from "./epics";
import rootReducer from "./reducers";


const epicMiddleware = createEpicMiddleware();


export default function configureStore() {
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
