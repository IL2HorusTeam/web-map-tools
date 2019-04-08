import React, { Component } from "react";


export default class LocationVariantsBoxComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationVariantsBox"},
      this.props.children,
    );
  }
}
