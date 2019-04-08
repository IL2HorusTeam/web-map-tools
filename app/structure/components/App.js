import React, { Component } from "react";
import PropTypes from "prop-types";

import LocationsCatalog from "../../LocationsCatalog";
import SplashScreenComponent from "./SplashScreen";


export default class AppComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: 'App'},
      this.maybeRenderSplashScreen(),
      this.maybeRenderLocationsCatalogBrowser(),
      this.maybeRenderWorkspace(),
    );
  }

  maybeRenderSplashScreen() {
    if (this.props.isLoading) {
      return React.createElement(SplashScreenComponent, null);
    }
  }

  maybeRenderLocationsCatalogBrowser() {
    if (this.props.isLocationsCatalogBrowserOpen) {
      let skeleton = this.props.locationsCatalog.getSkeleton();
      return this.props.makeLocationsCatalogBrowser(skeleton);
    }
  }

  maybeRenderWorkspace() {
    return this.props.makeWorkspace(this.props.locationsCatalog.toFlatMap());
  }

  componentDidMount() {
    this.props.onLoaded();
  }
}


AppComponent.propTypes = {
  isLoading: PropTypes.bool,
  onLoaded: PropTypes.func.isRequired,

  isLocationsCatalogBrowserOpen: PropTypes.bool,
  makeLocationsCatalogBrowser: PropTypes.func.isRequired,
  locationsCatalog: PropTypes.instanceOf(LocationsCatalog).isRequired,

  makeWorkspace: PropTypes.func.isRequired,
};

AppComponent.defaultProps = {
  isLoading: true,
  isLocationsCatalogBrowserOpen: false,
};
