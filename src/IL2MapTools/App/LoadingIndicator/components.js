import React, { Component } from "react";

import "./styles.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class LoadingIndicator extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LoadingIndicator"},
      React.createElement(LoadingIndicatorTextBox, null),
    );
  }
}

class LoadingIndicatorTextBox extends Component {
  render() {
    return React.createElement(
      "div",
      {className: "LoadingIndicator-TextBox"},
      React.createElement(FontAwesomeIcon, {
        icon:      "circle-notch",
        className: "LoadingIndicator-Icon"
      }),
      React.createElement(LoadingIndicatorText, null),
    )
  }
}


class LoadingIndicatorText extends Component {
  render() {
    return React.createElement(
      "span",
      {className: "LoadingIndicator-Text"},
      "Loading…"
    );
  }
}
