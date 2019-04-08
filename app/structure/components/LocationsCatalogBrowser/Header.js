import React, { Component } from "react";


export default class HeaderComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "Header"},
      React.createElement("h4", null, "Locations Catalog"),
      this.props.children,
    );
  }
}
