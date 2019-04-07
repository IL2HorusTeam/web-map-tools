import React, { Component } from "react";


export default class ViewportComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'Viewport'},
      React.createElement('span', null, 'Hi from viewport'),
    );
  }
}
