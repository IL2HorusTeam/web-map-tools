import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeActionCloseLocationsBrowser } from "IL2MapTools/App/actions";


class CloseLocationsBrowserButton extends Component {
  render() {
    let icon = React.createElement(FontAwesomeIcon, {
      icon:      "times-circle",
      className: "CloseLocationsBrowserButton-Icon",
    });
    return React.createElement(
      "div",
      {
        className: "CloseLocationsBrowserButton",
        onClick:   this.props.onClick,
      },
      icon,
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {dispatch(makeActionCloseLocationsBrowser())},
  };
}


CloseLocationsBrowserButton = (
  connect(null, mapDispatchToProps)
  (CloseLocationsBrowserButton)
);


export default CloseLocationsBrowserButton;
