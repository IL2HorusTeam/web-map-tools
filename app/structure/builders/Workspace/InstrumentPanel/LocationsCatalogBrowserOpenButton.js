import React from "react";
import { connect } from "react-redux";

import { makeActionLocationsCatalogBrowserOpen } from "../../../../behavior/actions";
import LocationsCatalogBrowserOpenButtonComponent from "../../../components/Workspace/InstrumentPanel/LocationsCatalogBrowserOpenButton";


const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(makeActionLocationsCatalogBrowserOpen()),
});


export const LocationsCatalogBrowserOpenButtonContainer = connect(
  null, mapDispatchToProps,
)(
  LocationsCatalogBrowserOpenButtonComponent
);


export default function buildLocationsCatalogBrowserOpenButton() {
  return React.createElement(LocationsCatalogBrowserOpenButtonContainer, null);
}
