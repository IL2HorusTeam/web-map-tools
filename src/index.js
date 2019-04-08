import "reset-css";
import "./styles/index.scss";

import ReactDOM from "react-dom";

import loggerMiddleware from "redux-logger";

import { loadLocationsCatalog } from "./LocationsCatalog";

import makeAppContainer from "./containers/App";
import makeWorkspaceContainer from "./containers/Workspace";
import makeLocationsCatalogBrowserContainer from "./containers/LocationsCatalogBrowser";

import makeEpic from "./interaction/epics";

import makeMiddlewareAppLoading from "./interaction/middlewares/App";
import makeMiddlewareArgs from "./interaction/middlewares/args";

import makeReducer from "./state/reducers";
import { makeStore } from "./state/store";
import { componentWithStoreProvider } from "./state/store";

import { makeLocationVariantIdValidator } from "./validators";

import initFontAwesome from "./fontawesome";


initFontAwesome();


const locationsCatalog = loadLocationsCatalog();
const locationVariantIdValidator = makeLocationVariantIdValidator(
  locationsCatalog.getLocationVariantIds(),
);

const rootReducer = makeReducer();
const rootEpic = makeEpic();

const middlewares = [
  loggerMiddleware,
  makeMiddlewareAppLoading(),
  makeMiddlewareArgs(locationVariantIdValidator),
];

const store = makeStore(rootReducer, rootEpic, middlewares);

const app = makeAppContainer(
  locationsCatalog,
  makeLocationsCatalogBrowserContainer,
  makeWorkspaceContainer,
);

ReactDOM.render(
  componentWithStoreProvider(app, store),
  document.getElementById('root'),
);
