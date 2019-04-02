import React, { Component } from "react";

import "./styles.scss";

import { sortTheatersByOrderAscByTitleAsc } from "./utils";
import Theater from "./Theater/components";


export default class TheatersColumn extends Component {
  render() {
    let theaters = this.props.theaters.slice();
    sortTheatersByOrderAscByTitleAsc(theaters);

    let theatersAsComponents = theaters.map((theater) => {
      return React.createElement(Theater, {
        id:        theater.id,
        title:     theater.title,
        locations: theater.locations,
      });
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheatersColumn"},
      ...theatersAsComponents
    );
  }
}
