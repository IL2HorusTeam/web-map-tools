import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.scss";

import LoadingIndicator from "./LoadingIndicator/components";
import LocationsBrowserWindow from "./LocationsBrowser/components";
import Workspace from "./Workspace/components";

import { APPLICATION_STATES } from "./types";
import { locationsBrowserTheatersFromTree } from "./utils";


class App extends Component {
  render() {
    let children = [];

    if (this.props.showLoadingIndicator) {
      children.push(React.createElement(LoadingIndicator, null));
    }

    if (this.props.showLocationsBrowser) {
      children.push(React.createElement(LocationsBrowserWindow, {
        theaters: locationsBrowserTheatersFromTree(
          this.props.locationVariantsTree,
        ),
      }));
    }

    if (this.props.showWorkspace) {
      children.push(React.createElement(Workspace, null));
    }

    return React.createElement('div', {className: 'App'}, ...children);
  }
}


function mapStateToProps(state) {
  let showLocationsBrowser = (
       state.app.state == APPLICATION_STATES.SELECTING_LOCATIONS
    || state.app.state == APPLICATION_STATES.BROWSING_LOCATIONS
  );

  let showLoadingIndicator = (state.app.state == APPLICATION_STATES.LOADING);
  let showWorkspace        = (state.app.state == APPLICATION_STATES.USING_MAP);

  return {
    showLocationsBrowser: showLocationsBrowser,
    showLoadingIndicator: showLoadingIndicator,
    showWorkspace:        showWorkspace,
  };
}


App = connect(mapStateToProps)(App);


export default App;
