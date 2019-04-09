import React, { Component } from "react";
import PropTypes from "prop-types";


export default class LocationTitleDisplayComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'LocationTitleDisplay'},
      this.props.locationFullTitle,
    );
  }
}


LocationTitleDisplayComponent.propTypes = {
  locationFullTitle: PropTypes.string.isRequired,
};
