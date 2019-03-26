import React, { Component } from "react";

import './styles.css';

class Viewport extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'Viewport'},
      React.createElement('span', null, 'Hi from viewport'),
    );
  }
}

export default Viewport;
