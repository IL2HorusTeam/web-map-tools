import React, { Component } from "react";
import PropTypes from "prop-types";

import LocationVariantsBoxComponent from "./LocationVariantsBox";
import SummaryComponent from "./Summary";


export default class MultipleVariantLocationComponent extends Component {
  render() {
    return React.createElement(
      'details',
      {className: "MultipleVariantLocation"},
      this.renderSummary(),
      this.renderVariantsBox(),
    );
  }

  renderSummary() {
    return React.createElement(SummaryComponent, {
      title:  this.props.title,
      tags:   this.props.tags,
      badges: this.props.badges,
    });
  }

  renderVariantsBox() {
    return React.createElement(
      LocationVariantsBoxComponent,
      null,
      this.props.children,
    );
  }
}


MultipleVariantLocationComponent.propTypes = {
  title: PropTypes.string.isRequired,
  tags:  PropTypes.arrayOf(PropTypes.shape({

    text:     PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
  })),
  badges: PropTypes.arrayOf(PropTypes.shape({

    text:     PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
  })),
}
