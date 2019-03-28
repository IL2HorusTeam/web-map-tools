import React, { Component } from "react";

import "App/components/styles.css";

import LocationsBrowserWindow from "./LocationsBrowser/components.js";
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
