import React from "react";

import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { Provider } from "react-redux";


export function makeStore(reducer, epic, middlewares) {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware, ...middlewares),
  );

  epicMiddleware.run(epic);
  
  return store;
}


export function componentWithStoreProvider(component, store) {
  return React.createElement(
    Provider,
    {store: store},
    component,
  )
}
