import React, { Component } from "react";


export default class ToolsBoxComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'ToolsBox'},
      this.props.children,
    );
  }
}
