import React from "react";
import { connect } from "react-redux";

import { makeActionLocationsCatalogBrowserOpen } from "../../../../behavior/actions";
import LocationsCatalogBrowserOpenButtonComponent from "../../../components/Workspace/InstrumentPanel/LocationsCatalogBrowserOpenButton";


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
