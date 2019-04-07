import React, { Component } from "react";
import PropTypes from "prop-types";


export default class HeaderComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "Header"},
      this.renderTitle(),
    );
  }

  renderTitle() {
    return React.createElement('span', null, this.props.title);
  }
}


HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
}
