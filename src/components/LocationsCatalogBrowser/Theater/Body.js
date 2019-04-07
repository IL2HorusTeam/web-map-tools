import React, { Component } from "react";


export default class BodyComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "Body"},
      this.props.children,
    );
  }
}
