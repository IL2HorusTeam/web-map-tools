import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";


export default class BadgeComponent extends Component {
  render() {
    return React.createElement(
      'span',
      {className: classNames("Badge", this.props.category)},
      this.props.text,
    );
  }
}

BadgeComponent.propTypes = {
  text:     PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
};
