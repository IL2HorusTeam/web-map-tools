import React from "react";
import { connect } from "react-redux";

import InstrumentPanelComponent from "../../../components/Workspace/InstrumentPanel";

import buildLocationsCatalogBrowserOpenButton from "./LocationsCatalogBrowserOpenButton";
import { buildLocationTitleDisplayContainer } from "./LocationTitleDisplay";
import { buildLocationTitleDisplay } from "./LocationTitleDisplay";


class InstrumentPanelBuilder {
  constructor(locationTitleDisplayContainer) {
    this.locationTitleDisplayContainer = locationTitleDisplayContainer;
  }

  buildLocationsCatalogBrowserOpenButton() {
    return buildLocationsCatalogBrowserOpenButton();
  }

  buildLocationTitleDisplay() {
    return buildLocationTitleDisplay(this.locationTitleDisplayContainer);
  }
}


const buildMapStateToProps = (locationTitleDisplayContainer) => (state) => ({
  builder: new InstrumentPanelBuilder(locationTitleDisplayContainer),
});


export function buildInstrumentPanelContainer(locationVariantsMap) {
  const locationTitleDisplayContainer = buildLocationTitleDisplayContainer(
    locationVariantsMap,
  );
  const mapStateToProps = buildMapStateToProps(locationTitleDisplayContainer);
  return connect(mapStateToProps)(InstrumentPanelComponent);
}


export function buildInstrumentPanel(instrumentPanelContainer) {
  return React.createElement(instrumentPanelContainer, null);
}
