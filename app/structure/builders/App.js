import React from "react";

import { connect } from "react-redux";
import { Provider } from "react-redux";

import { buildAppLoadedAction } from "../../behavior/actions";

import { selectAppIsLoading } from "../../state/selectors";
import { selectLocationsCatalogBrowserIsOpen } from "../../state/selectors";
import { selectLocationIsSelected } from "../../state/selectors";

import AppComponent from "../components/App";
import buildSplashScreen from "./SplashScreen";
import buildLocationsCatalogBrowser from "./LocationsCatalogBrowser";
import { buildWorkspaceContainer } from "./Workspace";
import { buildWorkspace } from "./Workspace";


class AppBuilder {
  constructor(state, locationsCatalog, workspaceContainer) {
    this.state = state;
    this.locationsCatalog = locationsCatalog;
    this.workspaceContainer = workspaceContainer;
  }

  maybeBuildSplashScreen() {
    const isLoading = selectAppIsLoading(this.state);
    if (isLoading) {
      return buildSplashScreen();
    }
  }

  maybeBuildLocationsCatalogBrowser() {
    const isOpen = selectLocationsCatalogBrowserIsOpen(this.state);
    if (isOpen) {
      const locationsSkeleton = this.locationsCatalog.getSkeleton();
      return buildLocationsCatalogBrowser(locationsSkeleton);
    }
  }

  maybeBuildWorkspace() {
    const isLocationSelected = selectLocationIsSelected(this.state);
    if (isLocationSelected) {
      return buildWorkspace(this.workspaceContainer);
    }
  }
}


const buildMapStateToProps = (locationsCatalog, workspaceContainer) => (state) => ({
  builder: new AppBuilder(state, locationsCatalog, workspaceContainer),
});


const mapDispatchToProps = (dispatch) => ({
  onLoaded: () => dispatch(buildAppLoadedAction()),
});


export function buildAppContainer(locationsCatalog) {
  const workspaceContainer = buildWorkspaceContainer(locationsCatalog.toFlatMap());
  const mapStateToProps = buildMapStateToProps(locationsCatalog, workspaceContainer);
  return connect(mapStateToProps, mapDispatchToProps)(AppComponent);
}


export function buildApp(appContainer, store) {
  const app = React.createElement(appContainer, null);
  return React.createElement(Provider, {store: store}, app);
}
