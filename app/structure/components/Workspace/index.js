import React, { Component } from "react";
import PropTypes from "prop-types";

import InstrumentPanelComponent from "./InstrumentPanel";
import ViewportComponent from "./Viewport";


export default class WorkspaceComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'Workspace'},
      this.renderViewport(),
      this.renderInstrumentPanel(),
    );
  }

  renderViewport() {
    return React.createElement(ViewportComponent, null);
  }

  renderInstrumentPanel() {
    return this.props.makeInstrumentPanel();
  }
}

WorkspaceComponent.propTypes = {
  makeInstrumentPanel: PropTypes.func.isRequired,
};
