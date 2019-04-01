import React, { Component } from "react";

import "./styles.scss";

import LocationsBrowserWindow from "./LocationsBrowser/components";
import Workspace from "./Workspace/components";


class App extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'App'},
      React.createElement(LocationsBrowserWindow, null),
      React.createElement(Workspace, null),
    );
  }
}


export default App;
