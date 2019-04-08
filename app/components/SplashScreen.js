import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class SplashScreenComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "SplashScreen"},
      React.createElement(ContentBoxComponent, null),
    );
  }
}


class ContentBoxComponent extends Component {
  render() {
    let icon = React.createElement(FontAwesomeIcon, {
      icon:      "circle-notch",
      className: "Icon"
    });
    let textBox = React.createElement(
      "span",
      {className: "TextBox"},
      "Loading…"
    );
    return React.createElement(
      "div",
      {className: "ContentBox"},
      icon,
      textBox,
    )
  }
}
