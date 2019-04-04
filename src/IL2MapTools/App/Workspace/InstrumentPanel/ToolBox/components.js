import React, { Component } from "react";

import './styles.scss';


class ToolBox extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'ToolBox'},
      ...this.props.children,
    );
  }
}

export default ToolBox;
