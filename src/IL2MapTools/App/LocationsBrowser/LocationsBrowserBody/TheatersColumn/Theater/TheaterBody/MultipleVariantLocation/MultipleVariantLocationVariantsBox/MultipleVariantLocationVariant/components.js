import React, { Component } from "react";

import TagsBox from "../../../TagsBox/components";


export default class MultipleVariantLocationVariant extends Component {
  render() {
    let children = [this.props.title];

    if (this.props.tags) {
      let tagsBox = React.createElement(TagsBox, {
        tags: this.props.tags,
      });
      children.push(tagsBox);
    }

    return React.createElement(
      'div',
      {className: "LocationsBrowser-MultipleVariantLocationVariant"},
      ...children
    );
  }
}
