import React, { Component } from "react";

import "./styles.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TagsBox from "../../TagsBox/components";
import BadgesBox from "../../BadgesBox/components";


export default class MultipleVariantLocationSummary extends Component {
  render() {
    let expandIcon = React.createElement(FontAwesomeIcon, {
      icon:      "chevron-right",
      className: "LocationsBrowser-MultipleVariantLocationIcon"
    });

    let children = [
      expandIcon,
      this.props.title,
    ];

    if (this.props.tags) {
      let tagsBox = React.createElement(TagsBox, {
        tags: this.props.tags,
      });
      children.push(tagsBox);
    } else if (this.props.badges) {
      let badgesBox = React.createElement(BadgesBox, {
        badges: this.props.badges,
      });
      children.push(badgesBox);
    }

    return React.createElement(
      'summary',
      {className: "LocationsBrowser-MultiVariantLocationSummary"},
      ...children
    );
  }
}
