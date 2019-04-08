import React, { Component } from "react";
import PropTypes from "prop-types";

import HeaderComponent from "./Header";
import BodyComponent from "./Body";


export default class TheaterComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "Theater"},
      this.renderHeader(),
      this.renderBody(),
    );
  }

  renderHeader() {
    return React.createElement(
      HeaderComponent,
      {title: this.props.title},
    );
  }

  renderBody() {
    return React.createElement(
      BodyComponent,
      null,
      this.props.children,
    );
  }
}


TheaterComponent.propTypes = {
  title: PropTypes.string.isRequired,
}
