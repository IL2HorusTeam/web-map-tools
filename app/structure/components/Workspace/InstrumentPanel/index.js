import React, { Component } from "react";
import PropTypes from "prop-types";

import ToolsBoxComponent from "./ToolsBox";


export default class InstrumentPanelComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'InstrumentPanel'},
      this.wrapWithToolsBox(
        this.props.makeLocationsCatalogBrowserOpenButton(),
        this.props.makeLocationTitleDisplay(),
      ),
    );
  }

  wrapWithToolsBox(...components) {
    return React.createElement(ToolsBoxComponent, null, ...components);
  }
}


InstrumentPanelComponent.propTypes = {
  makeLocationsCatalogBrowserOpenButton: PropTypes.func.isRequired,
  makeLocationTitleDisplay: PropTypes.func.isRequired,
};
