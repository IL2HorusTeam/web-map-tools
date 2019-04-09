import React, { Component } from "react";
import PropTypes from "prop-types";


export default class WorkspaceComponent extends Component {
  render() {
    const builder = this.props.builder;
    return React.createElement(
      'div',
      {className: 'Workspace'},
      builder.buildViewport(),
      builder.buildInstrumentPanel(),
    );
  }
}


WorkspaceComponent.propTypes = {
  builder: PropTypes.shape({
    buildViewport: PropTypes.func.isRequired,
    buildInstrumentPanel: PropTypes.func.isRequired,
  }).isRequired,
};
