import React, { Component } from "react";


export default class TagsBoxComponent extends Component {
  render() {
    return React.createElement(
      'span',
      {className: "TagsBox"},
      this.props.children,
    );
  }
}
