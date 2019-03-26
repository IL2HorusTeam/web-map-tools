import "reset-css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';

import App from "./App/components";
import { windowResize } from "./App/actions/window";
import loggerMiddleware from "./App/middleware";
import rootReducer from "./App/reducers";


const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware),
);

FontAwesomeLibrary.add(faChevronRight, faCircle);

ReactDOM.render(
  React.createElement(
    Provider,
    {store: store},
    React.createElement(App, null),
  ),
  document.getElementById("root"),
);


window.addEventListener('resize', function onWindowResize() {
  store.dispatch(windowResize(
    window.innerWidth,
    window.innerHeight,
  ));
});


console.log(store.getState());
