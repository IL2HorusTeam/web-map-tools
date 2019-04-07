import React, { Component } from "react";


export default class BadgesBoxComponent extends Component {
  render() {
    return React.createElement(
      'span',
      {className: "BadgesBox"},
      this.props.children,
    );
  }
}
