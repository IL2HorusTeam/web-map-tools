import React, { Component } from "react";


export default class LocationsBrowserHeader extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Header"},
      React.createElement("h4", null, "Locations Browser"),
    );
  }
}
