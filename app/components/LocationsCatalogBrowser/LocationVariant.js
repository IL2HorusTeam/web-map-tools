import React, { Component } from "react";
import PropTypes from "prop-types";

import TagsBoxComponent from "./TagsBox";
import TagComponent from "./Tag";


export default class LocationVariantComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {
        className: "LocationVariant",
        onClick: this.props.onClick,
      },
      this.props.title,
      this.maybeRenderTags(),
    );
  }

  maybeRenderTags() {
    if (!this.props.tags || this.props.tags.length == 0) {
      return;
    }

    return React.createElement(
      TagsBoxComponent,
      null,
      ...this.props.tags.map(this.renderTag)
    );
  }

  renderTag(tag) {
    return React.createElement(TagComponent, tag);
  }
}


LocationVariantComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tags:  PropTypes.arrayOf(PropTypes.shape({

    text:     PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
  })),
};
