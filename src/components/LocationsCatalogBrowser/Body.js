import React, { Component } from "react";

import ContentBoxComponent from "../ContentBox";


export default class BodyComponent extends Component {
  render() {
    let contentBox = React.createElement(
      ContentBoxComponent,
      null,
      this.props.children,
    );
    return React.createElement(
      'div',
      {className: "Body"},
      contentBox,
    );
  }
}
