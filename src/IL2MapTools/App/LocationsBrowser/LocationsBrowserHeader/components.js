import React, { Component } from "react";

import "./styles.scss";

import CloseLocationsBrowserButton from "./CloseLocationsBrowserButton/components"


export default class LocationsBrowserHeader extends Component {
  render() {
    let children = [
      React.createElement("h4", null, "Locations Browser"),
    ];

    if (this.props.showCloseButton) {
      children.push(React.createElement(CloseLocationsBrowserButton, null));
    }

    return React.createElement(
      'div',
      {className: "LocationsBrowser-Header"},
      ...children,
    );
  }
}
