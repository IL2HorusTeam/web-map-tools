import React, { Component } from "react";


export default class TheaterHeader extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheaterHeader"},
      React.createElement('span', null, this.props.title),
    );
  }
}
