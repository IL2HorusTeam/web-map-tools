import React, { Component } from "react";

import Badge from "./Badge/components";


export default class BadgesBox extends Component {
  render() {
    let badgesComponents = this.props.badges.map((badge) => {
      return React.createElement(Badge, {
        text:     badge.text,
        category: badge.category,
      });
    });
    return React.createElement(
      'span',
      {className: "BadgesBox"},
      ...badgesComponents
    );
  }
}
