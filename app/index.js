import "reset-css";
import "./styles/index.scss";

import ReactDOM from "react-dom";

import loggerMiddleware from "redux-logger";

import { loadLocationsCatalog } from "./LocationsCatalog";

import makeAppContainer from "./structure/containers/App";
import makeWorkspaceContainer from "./structure/containers/Workspace";
import makeLocationsCatalogBrowserContainer from "./structure/containers/LocationsCatalogBrowser";

import makeEpic from "./behavior/epics";

import makeMiddlewareAppLoading from "./behavior/middlewares/App";
import makeMiddlewareArgs from "./behavior/middlewares/args";

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
