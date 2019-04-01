import React, { Component } from "react";

import MultipleVariantLocationSummary from "./MultipleVariantLocationSummary/components";
import MultipleVariantLocationVariantsBox from "./MultipleVariantLocationVariantsBox/components";

import { maybeMakeMultipleVariantLocationBadges } from "./utils";


export default class MultipleVariantLocation extends Component {
  render() {
    let tags = this.props.tags;

    let badges = (
      (tags && tags.length > 0)
      ? undefined
      : maybeMakeMultipleVariantLocationBadges(this.props.variants)
    );

    let summary = React.createElement(MultipleVariantLocationSummary, {
      title:  this.props.title,
      tags:   tags,
      badges: badges,
    });

    let variantsBox = React.createElement(MultipleVariantLocationVariantsBox, {
      variants: this.props.variants,
    });

    return React.createElement(
      'details',
      {className: "LocationsBrowser-MultipleVariantLocation"},
      summary,
      variantsBox,
    );
  }
}
