import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeActionOpenLocationsBrowser } from "./actions.js";


class OpenLocationsBrowserButton extends Component {
  render() {
    let icon = React.createElement(FontAwesomeIcon, {
      icon:      "globe",
      className: "OpenLocationsBrowserButton-Icon",
    });
    return React.createElement(
      "div",
      {
        className: "OpenLocationsBrowserButton",
        onClick:   this.props.onClick,
      },
      icon,
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {dispatch(makeActionOpenLocationsBrowser())},
  };
}


OpenLocationsBrowserButton = (
  connect(null, mapDispatchToProps)
  (OpenLocationsBrowserButton)
);


export default OpenLocationsBrowserButton;
