import React, { Component } from "react";
import PropTypes from "prop-types";

import BodyComponent from "./Body";
import CloseButtonComponent from "./CloseButton";
import ContentBoxComponent from "../ContentBox";
import HeaderComponent from "./Header";
import LocationVariantComponent from "./LocationVariant";
import MultipleVariantLocationComponent from "./MultipleVariantLocation";
import TheaterComponent from "./Theater";
import TheatersColumnComponent from "./TheatersColumn";

import { extractLocationVariantsTagsAsFlatArray } from "./utils";
import { groupTagsIntoBadges } from "./utils";
import { spreadTheatersAcrossColumns } from "./utils";


export default class LocationsCatalogBrowserComponent extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsCatalogBrowser"},
      this.renderContentBox(),
    );
  }

  renderContentBox() {
    return React.createElement(
      ContentBoxComponent,
      null,
      this.renderHeader(),
      this.renderBody(),
    );
  }

  renderHeader() {
    let maybeCloseButton;
    if (this.props.isClosable) {
      maybeCloseButton = React.createElement(CloseButtonComponent, {
        onClick: this.props.onClose,
      });
    }
    return React.createElement(HeaderComponent, null, maybeCloseButton);
  }

  renderBody() {
    let columns = spreadTheatersAcrossColumns(
      (this.props.locationsCatalogSkeleton.theaters || []),
      (this.props.columnsCount || 1),
    );
    return React.createElement(
      BodyComponent,
      null,
      ...columns.map(this.renderTheatersColumn.bind(this)),
    );
  }

  renderTheatersColumn(columnTheaters) {
    return React.createElement(
      TheatersColumnComponent,
      null,
      ...columnTheaters.map(this.renderTheater.bind(this)),
    );
  }

  renderTheater(theater) {
    return React.createElement(
      TheaterComponent,
      {title: theater.title},
      ...theater.locations.map(this.renderLocation.bind(this)),
    );
  }

  renderLocation(location) {
    let renderer = (
      (location.variants && location.variants.length > 0)
      ? this.renderMultipleVariantLocation
      : this.renderSingleVariantLocation
    );
    return renderer.bind(this)(location);
  }

  renderMultipleVariantLocation(location) {
    let childrenTagsAsFlatArray = extractLocationVariantsTagsAsFlatArray(
      location.variants,
    );

    let maybeBadges = groupTagsIntoBadges(childrenTagsAsFlatArray);

    return React.createElement(
      MultipleVariantLocationComponent,
      {
        title:  location.title,
        tags:   location.tags,
        badges: maybeBadges,
      },
      ...location.variants.map(this.renderSingleVariantLocation.bind(this))
    );
  }

  renderSingleVariantLocation(location) {
    return React.createElement(LocationVariantComponent, {
      onClick: () => this.props.onLocationSelected(location.id),
      title:   location.title,
      tags:    location.tags,
    });
  }
}


LocationsCatalogBrowserComponent.propTypes = {
  isClosable: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onLocationSelected: PropTypes.func.isRequired,
  columnsCount: PropTypes.number,
  locationsCatalogSkeleton: PropTypes.shape({
    theaters: PropTypes.arrayOf(PropTypes.shape({

      title:     PropTypes.string.isRequired,
      id:        PropTypes.string.isRequired,
      order:     PropTypes.number.isRequired,
      locations: PropTypes.arrayOf(PropTypes.shape({

        title: PropTypes.string.isRequired,
        id:    PropTypes.string.isRequired,
        tags:  PropTypes.arrayOf(PropTypes.shape({

          text:     PropTypes.any.isRequired,
          category: PropTypes.string.isRequired,
        })),
        variants: PropTypes.arrayOf(PropTypes.shape({

          title: PropTypes.string.isRequired,
          id:    PropTypes.string.isRequired,
          tags:  PropTypes.arrayOf(PropTypes.shape({

            text:     PropTypes.any.isRequired,
            category: PropTypes.string.isRequired,
          })),
        })),
      })).isRequired,
    })).isRequired,
  }).isRequired,
};


LocationsCatalogBrowserComponent.defaultProps = {
  columnsCount: 1,
  isClosable: true,
};
