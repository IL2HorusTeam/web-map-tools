import React, { Component } from "react";

import "./styles.scss";

import MultipleVariantLocation from "./MultipleVariantLocation/components";
import SingleVariantLocation from "./SingleVariantLocation/components";


export default class TheaterBody extends Component {
  render() {
    let children = this.props.locations.map((location) => {
      let props = {
        id:    location.id,
        title: location.title,
        tags:  location.tags,
      };

      let componentType;

      if (location.variants && location.variants.length) {
        componentType = MultipleVariantLocation;
        props['variants'] = location.variants;
      } else {
        componentType = SingleVariantLocation;
      }

      return React.createElement(componentType, props);
    });

    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheaterBody"},
      ...children
    );
  }
}
