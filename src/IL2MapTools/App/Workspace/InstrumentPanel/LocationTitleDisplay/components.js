import React, { Component } from "react";
import { connect } from "react-redux";

import './styles.scss';


class LocationTitleDisplay extends Component {
  render() {
    let fullTitle = (
      this.props.locationVariants
      .find(item => (item.id === this.props.locationVariantId))
      .fullTitle
    );
    console.log(fullTitle);
    return React.createElement(
      'div',
      {className: 'LocationTitleDisplay'},
      fullTitle,
    );
  }
}


function mapStateToProps(state) {
  return {
    locationVariantId: state.app.locationVariantId,
  }
}


LocationTitleDisplay = connect(mapStateToProps)(LocationTitleDisplay);


export default LocationTitleDisplay;
