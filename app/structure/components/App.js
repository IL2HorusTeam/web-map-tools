import React, { Component } from "react";
import PropTypes from "prop-types";


export default class AppComponent extends Component {
  render() {
    const builder = this.props.builder;
    return React.createElement(
      'div',
      {className: 'App'},
      builder.maybeBuildSplashScreen(),
      builder.maybeBuildLocationsCatalogBrowser(),
      builder.maybeBuildWorkspace(),
    );
  }

  componentDidMount() {
    this.props.onLoaded();
  }
}


AppComponent.propTypes = {
  onLoaded: PropTypes.func.isRequired,
  builder: PropTypes.shape({
    maybeBuildSplashScreen: PropTypes.func.isRequired,
    maybeBuildLocationsCatalogBrowser: PropTypes.func.isRequired,
    maybeBuildWorkspace: PropTypes.func.isRequired,
  }).isRequired,
};
