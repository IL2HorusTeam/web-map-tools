import "reset-css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import "./styles.scss";

import { Theaters } from "IL2MapTools/locations/catalog.yaml";

import App from "./App/components";
import { makeListenerWindowSizeChanged } from "./Window/listeners";
import configureStore from "./store";
import { configureFontAwesome } from "./utils";


configureFontAwesome();


const store = configureStore();
const app = React.createElement(
  Provider,
  {store: store},
  React.createElement(App, {
    theaters: Theaters,
  }),
);


ReactDOM.render(app, document.getElementById("root"));


window.addEventListener(
  'resize',
  makeListenerWindowSizeChanged(store.dispatch),
);


console.log(store.getState());
