import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.scss";
import StylesVariables from "./stylesVariables.scss";

import LocationsBrowserHeader from "./LocationsBrowserHeader/components";
import LocationsBrowserBody from "./LocationsBrowserBody/components";

import { APPLICATION_STATES } from "../types";
import { getColumnsCount } from "./utils";


export default class LocationsBrowserWindow extends Component {
  render() {
    let container = React.createElement(LocationsBrowserContaiter, {
      theaters: this.props.theaters,
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Window"},
      container,
    );
  }
}


class LocationsBrowserContaiter extends Component {
  render() {
    let header = React.createElement(LocationsBrowserHeader, {
      showCloseButton: this.props.isClosable,
    });

    let bodyColumnsCount = getColumnsCount(
      this.props.widthActual,
      StylesVariables.contentWidthMax,
      StylesVariables.screenWidthStep,
      StylesVariables.contentColsCountMax,
    );
    let body = React.createElement(LocationsBrowserBody, {
      columnsCount: bodyColumnsCount,
      theaters:     this.props.theaters,
    });

    return React.createElement(
      'div',
      {className: "LocationsBrowser-Contaiter"},
      header,
      body,
    );
  }
}


function mapStateToLocationsBrowserContaiterProps(state) {
  return {
    widthActual: state.window.width,
    isClosable: (state.app.state == APPLICATION_STATES.BROWSING_LOCATIONS),
  };
}


LocationsBrowserContaiter = (
  connect(mapStateToLocationsBrowserContaiterProps)
  (LocationsBrowserContaiter)
);
