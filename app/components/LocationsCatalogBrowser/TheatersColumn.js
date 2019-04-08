import React, { Component } from "react";


export default class TheatersColumnComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "TheatersColumn"},
      this.props.children,
    );
  }
}
