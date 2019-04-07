import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";


export default class TagComponent extends Component {
  render() {
    return React.createElement(
      'span',
      {className: classNames("Tag", this.props.category)},
      this.props.text,
    );
  }
}

TagComponent.propTypes = {
  text:     PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
};
