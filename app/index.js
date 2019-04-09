import "reset-css";
import "./styles/index.scss";

import ReactDOM from "react-dom";

import loggerMiddleware from "redux-logger";

import { loadLocationsCatalog } from "./LocationsCatalog";

import makeEpic from "./behavior/epics";

import makeMiddlewareAppLoading from "./behavior/middlewares/App";
import makeMiddlewareArgs from "./behavior/middlewares/args";

import makeReducer from "./state/reducers";
import makeStore from "./state/store";

import { makeLocationVariantIdValidator } from "./validators";

import { buildAppContainer } from "./structure/builders/App";
import { buildApp } from "./structure/builders/App";

import initFontAwesome from "./fontawesome";


initFontAwesome();


const locationsCatalog = loadLocationsCatalog();
const locationVariantIdValidator = makeLocationVariantIdValidator(
  locationsCatalog.getLocationVariantIds(),
);

const reducer = makeReducer();
const epic = makeEpic();
const middlewares = [
  loggerMiddleware,
  makeMiddlewareAppLoading(),
  makeMiddlewareArgs(locationVariantIdValidator),
];
const store = makeStore(reducer, epic, middlewares);
const appContainer = buildAppContainer(locationsCatalog);
const app = buildApp(appContainer, store);


ReactDOM.render(app, document.getElementById('root'));
