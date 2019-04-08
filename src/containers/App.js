import React from "react";
import { connect } from "react-redux";

import AppComponent from "../components/App";
import { makeActionAppLoaded } from "../actions";
import { selectIsAppLoading } from "../selectors";
import { selectIsLocationsCatalogBrowserOpen } from "../selectors";


function mapStateToProps(state) {
  return {
    isLoading: selectIsAppLoading(state),
    isLocationsCatalogBrowserOpen: selectIsLocationsCatalogBrowserOpen(state),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onLoaded: () => dispatch(makeActionAppLoaded()),
  };
}


export const AppContainer = (
  connect(mapStateToProps, mapDispatchToProps)
  (AppComponent)
);


export default function makeAppContainer(
  locationsCatalog,
  locationsCatalogBrowserMaker,
  workspaceContainerMaker,
) {
  return React.createElement(AppContainer, {
    locationsCatalog: locationsCatalog,
    makeLocationsCatalogBrowser: locationsCatalogBrowserMaker,
    makeWorkspace: workspaceContainerMaker,
  });
};
