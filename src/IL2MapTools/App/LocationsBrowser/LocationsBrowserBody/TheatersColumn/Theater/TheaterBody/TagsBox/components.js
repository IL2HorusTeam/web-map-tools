import React, { Component } from "react";

import Tag from "./Tag/components";


export default class TagsBox extends Component {
  render() {
    let tagsComponents = this.props.tags.map((tag) => {
      return React.createElement(Tag, {
        text:     tag.text,
        category: tag.category,
      });
    });
    return React.createElement(
      'span',
      {className: "TagsBox"},
      ...tagsComponents
    );
  }
}
