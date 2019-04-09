import React from "react";
import { connect } from "react-redux";

import { buildActionLocationsCatalogBrowserOpen } from "../../../../behavior/actions";
import LocationsCatalogBrowserOpenButtonComponent from "../../../components/Workspace/InstrumentPanel/LocationsCatalogBrowserOpenButton";


const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(buildActionLocationsCatalogBrowserOpen()),
});


export const LocationsCatalogBrowserOpenButtonContainer = connect(
  null, mapDispatchToProps,
)(
  LocationsCatalogBrowserOpenButtonComponent
);


export default function buildLocationsCatalogBrowserOpenButton() {
  return React.createElement(LocationsCatalogBrowserOpenButtonContainer, null);
}
