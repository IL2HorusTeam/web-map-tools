import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";


export default function buildStore(reducer, epic, middlewares) {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware, ...middlewares),
  );

  epicMiddleware.run(epic);

  return store;
}
