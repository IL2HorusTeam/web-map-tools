import React, { Component } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class LocationsCatalogBrowserOpenButtonComponent extends Component {
  render() {
    return React.createElement(
      "div",
      {
        className: "LocationsCatalogBrowserOpenButton",
        onClick: this.props.onClick,
      },
      this.renderIcon(),
    );
  }

  renderIcon() {
    return React.createElement(FontAwesomeIcon, {
      icon: "globe",
      className: "Icon",
    });
  }
}

LocationsCatalogBrowserOpenButtonComponent.propTypes = {
  onClick: PropTypes.func,
};
