import React, { Component } from "react";

import './styles.scss';

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
