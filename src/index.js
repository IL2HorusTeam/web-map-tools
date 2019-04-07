import "reset-css";
import "./styles/index.scss";

import ReactDOM from "react-dom";

import loggerMiddleware from "redux-logger";

import { loadLocationsCatalog } from "./LocationsCatalog";
import initFontAwesome from "./utils/fontawesome";
import makeEpic from "./epics";
import makeReducer from "./reducers";
import { makeStore } from "./store";
import { componentWithStoreProvider } from "./store";
import makeAppContainer from "./containers/App";
import makeMiddlewareAppLoading from "./middlewares/App";
import makeMiddlewareArgs from "./middlewares/args";
import { makeLocationVariantIdValidator } from "./validators/Workspace";
import makeLocationsCatalogBrowserContainer from "./containers/LocationsCatalogBrowser";
import makeWorkspaceContainer from "./containers/Workspace";


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
