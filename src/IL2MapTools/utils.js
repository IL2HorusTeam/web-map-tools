import { library as FontAwesomeLibrary } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Theaters } from "IL2MapTools/locations/catalog.yaml";


export function configureFontAwesome() {
  FontAwesomeLibrary.add(faChevronRight);
}


function makeLocationVariantFullId(locationId, locationVariantId) {
  return `${locationId}:${locationVariantId}`;
}


function makeLocationVariantFullTitle(locationTitle, locationVariantTitle) {
  return `${locationTitle} / ${locationVariantTitle}`;
}


function maybeMergeTags(locationTags, locationVariantTags) {
  if (
       (!locationTags || locationTags.length == 0)
    && (!locationVariantTags || locationVariantTags.length == 0)
  ) {
    return;
  }

  let combined = (locationTags || []).concat(locationVariantTags || []);
  return combined.filter((item, pos, self) => (self.indexOf(item) == pos));
}


export function loadLocationVariantsTree() {
  return Theaters.map(theater => Object.freeze({
    title:            theater.title,
    id:               theater.id,
    displayOrder: theater.displayOrder,
    locations:        theater.locations.map(location => Object.freeze({

      title:      location.title,
      id:         location.id,
      tags:       location.tags,
      zoom:       location.zoom,
      dimensions: location.dimensions,
      season:     location.season,
      variants: (
           location.variants
        && location.variants.map(variant => Object.freeze({

          title:     variant.title,
          id:        makeLocationVariantFullId(location.id, variant.id),
          tags:      variant.tags,
          season:    variant.season,
          subregion: variant.subregion,
        }))
      ),
    })),
  }));
}


export function flattenLocationVariantsTree(theaters) {
  let flatLocations = theaters.map(theater => theater.locations).flat();

  let locationsVariants = flatLocations.map(location => {
    if (location.variants && location.variants.length) {
      return location.variants.map(variant => Object.freeze({
        title:      variant.title,
        fullTitle:  makeLocationVariantFullTitle(location.title, variant.title),
        id:         variant.id,
        zoom:       location.zoom,
        dimensions: location.dimensions,
        subregion:  variant.subregion,
        tags:       maybeMergeTags(location.tags, variant.tags),
        season:     variant.season || location.season,
      }));
    }

    return Object.freeze(Object.assign(
      {
        fullTitle: location.title,
      },
      location,
    ));
  });

  return locationsVariants.flat();
}
