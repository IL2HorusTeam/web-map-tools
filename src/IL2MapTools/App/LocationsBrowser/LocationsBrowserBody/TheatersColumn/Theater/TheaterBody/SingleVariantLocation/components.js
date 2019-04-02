import React, { Component } from "react";

import "./styles.scss";

import TagsBox from "../TagsBox/components";


export default class SingleVariantLocation extends Component {
  render() {
    let children = [this.props.title];

    if (this.props.tags) {
      let tagsBox = React.createElement(TagsBox, {tags: this.props.tags});
      children.push(tagsBox);
    }

    return React.createElement(
      'div',
      {className: "LocationsBrowser-SingleVariantLocation"},
      ...children
    );
  }
}
