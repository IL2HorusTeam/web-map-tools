import React, { Component } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class CloseButtonComponent extends Component {
  render() {
    let icon = React.createElement(FontAwesomeIcon, {
      icon:      "times-circle",
      className: "Icon",
    });
    return React.createElement(
      "div",
      {
        className: "CloseButton",
        onClick:   this.props.onClick,
      },
      icon,
    );
  }
}


CloseButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
}
