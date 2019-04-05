import React, { Component } from "react";

import './styles.scss';

import ToolBox from "./ToolBox/components";
import OpenLocationsBrowserButton from "./OpenLocationsBrowserButton/components";
import LocationTitleDisplay from "./LocationTitleDisplay/components";


class InstrumentPanel extends Component {
  render() {
    let openLocationsBrowserButton = React.createElement(
      OpenLocationsBrowserButton,
    );
    let locationNameDisplay = React.createElement(
      LocationTitleDisplay,
      {locationVariants: this.props.locationVariants}
    );

    let leftToolbox = React.createElement(
      ToolBox, {
        children: [
          openLocationsBrowserButton,
          locationNameDisplay,
        ],
      }
    );

    return React.createElement(
      'div',
      {className: 'InstrumentPanel'},
      leftToolbox,
    );
  }
}

export default InstrumentPanel;
