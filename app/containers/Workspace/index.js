import React from "react";
import { connect } from "react-redux";

import WorkspaceComponent from "../../components/Workspace";
import makeInstrumentPanelContainer from "./InstrumentPanel";


function mapStateToProps(state) {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {};
}


export const WorkspaceContainer = (
  connect(mapStateToProps, mapDispatchToProps)
  (WorkspaceComponent)
);


export default function makeWorkspaceContainer(locationsVariantsMap) {
  return React.createElement(
    WorkspaceContainer,
    {
      makeInstrumentPanel: () => makeInstrumentPanelContainer(locationsVariantsMap),
    },
  );
};
