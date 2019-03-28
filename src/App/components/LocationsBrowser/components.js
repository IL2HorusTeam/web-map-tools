import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./styles/index.scss";
import StylesVariables from "./styles/variables.scss"

import { Theaters } from "locations/catalog.yaml";


export default class LocationsBrowserWindow extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Window"},
      React.createElement(LocationsBrowserContaiter, null),
    );
  }
}


class LocationsBrowserContaiter extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Contaiter"},
      React.createElement(LocationsBrowserHeader, null),
      React.createElement(LocationsBrowserBody, null),
    );
  }
}


class LocationsBrowserHeader extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Header"},
      React.createElement("h4", null, "Locations Browser"),
    );
  }
}


class LocationsBrowserBody extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Body"},
      React.createElement(LocationsBrowserContent, null),
    );
  }
}

class LocationsBrowserContent extends Component {
  render() {
    let bins = new Array(this.props.columnsCount);
    for (var i = 0; i < this.props.columnsCount; ++i) {
      bins[i] = {
        items:    [],
        length:   0,
        priority: 0,
      };
    }

    let theaters = Theaters.slice();
    theaters.sort((a, b) => {
      if (a.locations.length > b.locations.length) {return -1;}
      if (a.locations.length < b.locations.length) {return 1;}

      if (a.priority < b.priority) {return -1;}
      if (a.priority > b.priority) {return  1;}

      if (a.title < b.title) {return -1;}
      if (a.title > b.title) {return  1;}

      return 0;
    });

    for (var item of theaters) {
      let minResultingLengthValue = Number.MAX_SAFE_INTEGER;
      let minResultingLengthBinId = 0;

      for (var binId = 0; binId < bins.length; ++binId) {
        let bin = bins[binId];
        let resultingLength = bin.length + item.locations.length;
        if (resultingLength < minResultingLengthValue) {
          minResultingLengthBinId = binId;
          minResultingLengthValue = resultingLength;
        }
      }

      let bin = bins[minResultingLengthBinId];
      bin.items.push(item);
      bin.length = minResultingLengthValue;

      if ((Number.MAX_SAFE_INTEGER - item.priority) < bin.priority) {
        bin.priority = Number.MAX_SAFE_INTEGER;
      } else {
        bin.priority += item.priority;
      }
    }

    bins.sort((a, b) => {
      if (a.priority < b.priority) {return -1;}
      if (a.priority > b.priority) {return  1;}

      if (a.length < b.length) {return  1;}
      if (a.length > b.length) {return -1;}

      return 0;
    });

    for (var bin of bins) {
      bin.items.sort((a, b) => {
        if (a.priority < b.priority) {return -1;}
        if (a.priority > b.priority) {return  1;}

        if (a.title < b.title) {return -1;}
        if (a.title > b.title) {return  1;}

        return 0;
      });
    }

    let children = bins.map((bin) => {
      return React.createElement(
        TheatersColumn,
        {locations: bin.items},
      );
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Content"},
      ...children
    );
  }
}


function mapStateToLocationsBrowserContentProps(state) {
  let width = Math.min(state.window.width, StylesVariables.contentWidthMax);
  let columnsCount = Math.floor(width / StylesVariables.screenWidthStep);
  columnsCount = Math.min(columnsCount, StylesVariables.contentColsCountMax);
  columnsCount = Math.max(columnsCount, 1);

  return {
    columnsCount: columnsCount,
  };
}


LocationsBrowserContent = (
  connect(mapStateToLocationsBrowserContentProps)
  (LocationsBrowserContent)
);


class TheatersColumn extends Component {
  render() {
    let children = this.props.locations.map((theater) => {
      return React.createElement(
        Theater,
        {
          id:        theater.id,
          title:     theater.title,
          locations: theater.locations,
        },
      );
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheatersColumn"},
      ...children
    );
  }
}


class Theater extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-Theater"},
      React.createElement(TheaterHeader, {title:     this.props.title}),
      React.createElement(TheaterBody,   {locations: this.props.locations}),
    );
  }
}


class TheaterHeader extends Component {
  render() {
    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheaterHeader"},
      React.createElement('span', null, this.props.title),
    );
  }
}


class TheaterBody extends Component {
  render() {
    let children = this.props.locations.map((location) => {
      let props = {
        id:    location.id,
        title: location.title,
        tags:  location.tags,
      };

      let type;

      if (location.variants && location.variants.length > 1) {
        type = MultiVariantLocation;
        props['variants'] = location.variants;
      } else {
        type = SingleVariantLocation;
      }

      return React.createElement(type, props);
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-TheaterBody"},
      ...children
    );
  }
}

class SingleVariantLocation extends Component {
  render() {
    let tags = (this.props.tags || []).map((tag) => {
      return React.createElement(
        CategoryTag,
        {text: tag.text, category: tag.category}
      );
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-SingleVariantLocation"},
      this.props.title,
      ...tags
    );
  }
}

class MultiVariantLocation extends Component {
  render() {
    let tags;
    if (this.props.tags) {
      tags = this.props.tags.map((tag) => {
        return React.createElement(
          CategoryTag,
          {text: tag.text, category: tag.category}
        );
      });
    } else {
      let tagCategories = (
        this.props.variants
        .map((variant) => {
          return (
            (variant.tags || [])
            .map(function tagCategory(tag) {
              return tag.category;
            })
            .filter(function unique(value, index, self) {
              return self.indexOf(value) === index;
            })
          );
        })
        .flat()
      );
      tags = tagCategories.map((category) => {
        return React.createElement(
          FontAwesomeIcon,
          {
            icon:      "circle",
            className: ["CategoryTagIndicator", category].join(" "),
          },
        );
      });
    }
    return React.createElement(
      'details',
      {className: "LocationsBrowser-MultiVariantLocation"},
      React.createElement(
        MultiVariantLocationSummary,
        {
          title: this.props.title,
          tags:  tags,
        },
      ),
      React.createElement(
        MultiVariantLocationVariants,
        {variants: this.props.variants},
      ),
    );
  }
}

class MultiVariantLocationSummary extends Component {
  render() {
    return React.createElement(
      'summary',
      {className: "LocationsBrowser-MultiVariantLocationSummary"},
      React.createElement(
        FontAwesomeIcon,
        {
          icon:      "chevron-right",
          className: "LocationsBrowser-MultiVariantLocationIcon"
        },
      ),
      this.props.title,
      ...this.props.tags
    );
  }
}

class MultiVariantLocationVariants extends Component {
  render() {
    let children = this.props.variants.map((variant) => {
      return React.createElement(
        MultiVariantLocationVariant,
        {
          id:     variant.id,
          title:  variant.title,
          tags:   variant.tags,
          season: variant.season,
        }
      );
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-MultiVariantLocationVariants"},
      ...children,
    );
  }
}

class MultiVariantLocationVariant extends Component {
  render() {
    let tags = (this.props.tags || []).map((tag) => {
      return React.createElement(
        CategoryTag,
        {text: tag.text, category: tag.category}
      );
    });
    return React.createElement(
      'div',
      {className: "LocationsBrowser-MultiVariantLocationVariant"},
      this.props.title,
      ...tags
    );
  }
}


class CategoryTag extends Component {
  render() {
    return React.createElement(
      'span',
      {className: ["CategoryTag", this.props.category].join(' ')},
      this.props.text,
    );
  }
}
