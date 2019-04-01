import React, { Component } from "react";

import TheaterHeader from "./TheaterHeader/components";
import TheaterBody from "./TheaterBody/components";


export default class Theater extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Theater"},
      React.createElement(TheaterHeader, {title:     this.props.title}),
      React.createElement(TheaterBody,   {locations: this.props.locations}),
    );
  }
}
