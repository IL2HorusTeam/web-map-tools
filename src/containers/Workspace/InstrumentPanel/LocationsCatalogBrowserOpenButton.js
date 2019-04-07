import React from "react";
import { connect } from "react-redux";

import LocationsCatalogBrowserOpenButtonComponent from "../../../components/Workspace/InstrumentPanel/LocationsCatalogBrowserOpenButton";
import { makeActionLocationsCatalogBrowserOpen } from "../../../actions/LocationsCatalogBrowser";


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(makeActionLocationsCatalogBrowserOpen()),
  };
}


export const LocationsCatalogBrowserOpenButtonContainer = (
  connect(null, mapDispatchToProps)
  (LocationsCatalogBrowserOpenButtonComponent)
);


export default function makeLocationsCatalogBrowserOpenButtonContainer() {
  return React.createElement(LocationsCatalogBrowserOpenButtonContainer, null);
};
