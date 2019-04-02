import React, { Component } from "react";

import "./styles.scss";

import { locationsBrowserTheatersFromTree } from "./utils";
import LocationsBrowserWindow from "./LocationsBrowser/components";
import Workspace from "./Workspace/components";


class App extends Component {
  render() {
    let locationsBrowserWindow = React.createElement(LocationsBrowserWindow, {
      theaters: locationsBrowserTheatersFromTree(this.props.locationVariantsTree),
    });

    let workspace = React.createElement(Workspace, null);

    return React.createElement(
      'div',
      {className: 'App'},
      locationsBrowserWindow,
      workspace,
    );
  }
}


export default App;
