import "reset-css";
import "./styles/index.scss";

import ReactDOM from "react-dom";

import loggerMiddleware from "redux-logger";

import { loadLocationsCatalog } from "./LocationsCatalog";

import buildEpic from "./behavior/epics";

import buildMiddlewareAppLoading from "./behavior/middlewares/App";
import buildMiddlewareArgs from "./behavior/middlewares/args";

import buildReducer from "./state/reducers";
import buildStore from "./state/store";

import { buildLocationVariantIdValidator } from "./validators";

import { buildAppContainer } from "./structure/builders/App";
import { buildApp } from "./structure/builders/App";

import initFontAwesome from "./fontawesome";


initFontAwesome();


const locationsCatalog = loadLocationsCatalog();
const locationVariantIdValidator = buildLocationVariantIdValidator(
  locationsCatalog.getLocationVariantIds(),
);

const reducer = buildReducer();
const epic = buildEpic();
const middlewares = [
  loggerMiddleware,
  buildMiddlewareAppLoading(),
  buildMiddlewareArgs(locationVariantIdValidator),
];
const store = buildStore(reducer, epic, middlewares);
const appContainer = buildAppContainer(locationsCatalog);
const app = buildApp(appContainer, store);


ReactDOM.render(app, document.getElementById('root'));
