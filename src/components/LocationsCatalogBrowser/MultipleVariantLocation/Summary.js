import React, { Component } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TagComponent from "../Tag";
import TagsBoxComponent from "../TagsBox";

import BadgeComponent from "../Badge";
import BadgesBoxComponent from "../BadgesBox";


export default class SummaryComponent extends Component {
  render() {
    return React.createElement(
      'summary',
      {className: "Summary"},
      this.renderExpandIcon(),
      this.props.title,
      this.maybeRenderTagsBoxOrBadgesBox(),
    );
  }

  renderExpandIcon() {
    return React.createElement(FontAwesomeIcon, {
      icon:      "chevron-right",
      className: "ExpandIcon",
    });
  }

  maybeRenderTagsBoxOrBadgesBox() {
    if (this.props.tags && this.props.tags.length > 0) {
      return this.renderTagsBox(this.props.tags);
    } else if (this.props.badges && this.props.badges.length > 0) {
      return this.renderBadgesBox(this.props.badges);
    }
  }

  renderTagsBox(tags) {
    return React.createElement(
      TagsBoxComponent,
      null,
      ...tags.map(this.renderTag.bind(this))
    )
  }

  renderTag(tag) {
    return React.createElement(TagComponent, tag);
  }

  renderBadgesBox(badges) {
    return React.createElement(
      BadgesBoxComponent,
      null,
      ...badges.map(this.renderBadge.bind(this))
    )
  }

  renderBadge(badge) {
    return React.createElement(BadgeComponent, badge);
  }
}


SummaryComponent.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({

    text:     PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
  })),
  badges: PropTypes.arrayOf(PropTypes.shape({

    text:     PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
  })),
}
