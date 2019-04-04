import React, { Component } from "react";

import './styles.scss';

import ToolBox from "./ToolBox/components";
import OpenLocationsBrowserButton from "./OpenLocationsBrowserButton/components";


class InstrumentPanel extends Component {
  render() {
    let openLocationsBrowserButton = React.createElement(
      OpenLocationsBrowserButton,
    );

    let leftToolbox = React.createElement(
      ToolBox, {
        children: [
          openLocationsBrowserButton,
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
