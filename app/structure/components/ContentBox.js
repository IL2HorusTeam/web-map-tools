import React, { Component } from "react";


export default class ContentBoxComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "ContentBox"},
      this.props.children,
    );
  }
}
