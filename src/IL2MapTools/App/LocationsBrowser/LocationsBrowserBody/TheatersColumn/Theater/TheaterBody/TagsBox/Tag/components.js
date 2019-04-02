import React, { Component } from "react";

import classNames from "classnames";

import "./styles.scss";


export default class Tag extends Component {
  render() {
    return React.createElement(
      'span',
      {className: classNames("Tag", this.props.category)},
      this.props.text,
    );
  }
}
