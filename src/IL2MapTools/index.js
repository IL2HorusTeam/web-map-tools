import "reset-css";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import "./styles.scss";

import App from "./App/components";
import { makeActionApplicationLoaded } from "./App/actions";
import { makeListenerWindowSizeChanged } from "./Window/listeners";
import { makeListenerKeyboardKeyPressed } from "./Keyboard/listeners";
import { makeRootEpic } from "./epics";
import { configureStore } from "./store";
import { configureFontAwesome } from "./utils";
import { flattenLocationVariantsTree } from "./utils";
import { loadLocationVariantsTree } from "./utils";


configureFontAwesome();

const locationVariantsTree = loadLocationVariantsTree();
const locationVariants     = flattenLocationVariantsTree(locationVariantsTree);

const epic  = makeRootEpic(locationVariants);
const store = configureStore(epic);

const app = React.createElement(
  Provider,
  {store: store},
  React.createElement(
    App,
    {locationVariantsTree: locationVariantsTree},
  ),
);

ReactDOM.render(app, document.getElementById('root'));

window.addEventListener(
  'resize',
  makeListenerWindowSizeChanged(store.dispatch),
);

window.addEventListener(
  'keydown',
  makeListenerKeyboardKeyPressed(store.dispatch),
)

store.dispatch(makeActionApplicationLoaded());
