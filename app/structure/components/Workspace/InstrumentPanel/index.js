import React, { Component } from "react";
import PropTypes from "prop-types";

import ToolsBoxComponent from "./ToolsBox";


export default class InstrumentPanelComponent extends Component {
  render() {
    const builder = this.props.builder;
    return React.createElement(
      'div',
      {className: 'InstrumentPanel'},
      this.wrapWithToolsBox(
        builder.buildLocationsCatalogBrowserOpenButton(),
        builder.buildLocationTitleDisplay(),
      ),
    );
  }

  wrapWithToolsBox(...components) {
    return React.createElement(ToolsBoxComponent, null, ...components);
  }
}


InstrumentPanelComponent.propTypes = {
  builder: PropTypes.shape({
    buildLocationsCatalogBrowserOpenButton: PropTypes.func.isRequired,
    buildLocationTitleDisplay: PropTypes.func.isRequired,
  }).isRequired,
};
