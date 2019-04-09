import React from "react";
import { connect } from "react-redux";

import WorkspaceComponent from "../../components/Workspace";


import buildViewport from "./Viewport";
import { buildInstrumentPanelContainer } from "./InstrumentPanel";
import { buildInstrumentPanel } from "./InstrumentPanel";


class WorkspaceBuilder {
  constructor(instrumentPanelContainer) {
    this.instrumentPanelContainer = instrumentPanelContainer;
  }

  buildViewport() {
    return buildViewport();
  }

  buildInstrumentPanel() {
    return buildInstrumentPanel(this.instrumentPanelContainer);
  }
}


const buildMapStateToProps = (instrumentPanelContainer) => (state) => ({
  builder: new WorkspaceBuilder(instrumentPanelContainer),
});


export function buildWorkspaceContainer(locationVariantsMap) {
  const instrumentPanelContainer = buildInstrumentPanelContainer(
    locationVariantsMap,
  );
  const mapStateToProps = buildMapStateToProps(instrumentPanelContainer);
  return connect(mapStateToProps, null)(WorkspaceComponent);
}


export function buildWorkspace(workspaceContainer) {
  return React.createElement(workspaceContainer, null);
}
