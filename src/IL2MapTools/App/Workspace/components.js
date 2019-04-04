import React, { Component } from "react";

import './styles.scss';

import InstrumentPanel from "./InstrumentPanel/components.js";
import Viewport from "./Viewport/components.js";


class Workspace extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'Workspace'},
      React.createElement(Viewport, null),
      React.createElement(InstrumentPanel, null),
    );
  }
}

export default Workspace;
