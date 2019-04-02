import React, { Component } from "react";

import "./styles.scss";

import MultipleVariantLocationVariant from "./MultipleVariantLocationVariant/components";


export default class MultipleVariantLocationVariantsBox extends Component {
  render() {
    let variantsComponents = this.props.variants.map((variant) => {
      return React.createElement(MultipleVariantLocationVariant, variant);
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-MultipleVariantLocationVariantsBox"},
      ...variantsComponents,
    );
  }
}
