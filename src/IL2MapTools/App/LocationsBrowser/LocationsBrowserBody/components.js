import React, { Component } from "react";

import { spreadTheatersAcrossColumns } from "./utils";
import TheatersColumn from "./TheatersColumn/components";


export default class LocationsBrowserBody extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Body"},
      React.createElement(LocationsBrowserContent, {
        theaters:     this.props.theaters,
        columnsCount: this.props.columnsCount,
      }),
    );
  }
}


class LocationsBrowserContent extends Component {
  render() {
    let columns = spreadTheatersAcrossColumns(
      (this.props.theaters     || []),
      (this.props.columnsCount || 1),
    );

    let columnsAsComponents = columns.map((theaters) => {
      return React.createElement(TheatersColumn, {
        theaters: theaters
      });
    });

    return React.createElement(
      'div',
      {className: "LocationsBrowser-Content"},
      ...columnsAsComponents
    );
  }
}
