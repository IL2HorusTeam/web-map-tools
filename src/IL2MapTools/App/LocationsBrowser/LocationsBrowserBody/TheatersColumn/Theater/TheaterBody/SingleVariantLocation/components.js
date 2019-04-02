import React, { Component } from "react";
import { connect } from "react-redux";

import { makeActionLocationVariantSelected } from "IL2MapTools/App/actions";

import "./styles.scss";

import TagsBox from "../TagsBox/components";


export default class SingleVariantLocation extends Component {
  render() {
    let children = [
      this.props.title,
    ];

    if (this.props.tags) {
      let tagsBox = React.createElement(TagsBox, {tags: this.props.tags});
      children.push(tagsBox);
    }

    return React.createElement(
      'div',
      {
        className: "LocationsBrowser-SingleVariantLocation",
        onClick: () => {this.props.select(this.props.id)},
      },
      ...children
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    select: (id) => {dispatch(makeActionLocationVariantSelected(id))},
  };
}


SingleVariantLocation = (
  connect(
    null,
    mapDispatchToProps,
  )(SingleVariantLocation)
);
