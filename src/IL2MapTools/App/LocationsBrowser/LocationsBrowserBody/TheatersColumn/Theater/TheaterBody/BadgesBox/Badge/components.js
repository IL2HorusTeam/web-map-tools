import React, { Component } from "react";

import classNames from "classnames";

import "./styles.scss";


export default class Badge extends Component {
  render() {
    return React.createElement(
      'span',
      {className: classNames("Badge", this.props.category)},
      this.props.text,
    );
  }
}
