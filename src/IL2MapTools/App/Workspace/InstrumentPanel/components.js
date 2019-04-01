import React, { Component } from "react";

import './styles.css';

class InstrumentPanel extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'InstrumentPanel'},
      React.createElement('span', null, 'Hi from instrument panel'),
    );
  }
}

export default InstrumentPanel;
